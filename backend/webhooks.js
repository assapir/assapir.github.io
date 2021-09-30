const { Router } = require('express')
const router = Router()
const crypto = require('crypto')
const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();
kc.loadFromDefault();
const k8sApi = kc.makeApiClient(k8s.AppsV1Api);
const deploymentName = 'comments-api'
const namespace = 'default'

router.post('/', async (req, res) => {
  try {
    console.log('Incoming webhook, processing!')

    const event = req.headers['X-GitHub-Event']
    if (event !== 'package') {
      console.warn('Not a package event, ignoring')
      return res.sendStatus(204)
    }

    const signature = req.headers['X-Hub-Signature-256']
    verifySignature(signature, req.body)

    const { package: { package_version: { container_metadata: { tag: { name }, labels } } } } = req.body
    if (name !== 'latest') {
      console.warn('Not latest, ignoring')
      return res.sendStatus(204)
    }

    const platforms = JSON.parse(labels?.all_labels?.['github.internal.platforms'])
    if (!platforms?.some(p => p.architecture === 'amd64')) {
      console.warn('Not amd64, ignoring')
      return res.sendStatus(204)
    }

    await deploy()

    console.log(`Done, `)
  } catch (err) {
    console.error(`Unable to do anything with GitHub webhook, ${err.message}`)
  }
  return res.sendStatus(204)
})

// Verify github sha256 webhook signature
function verifySignature(signature, body) {
  if (!process.env.GITHUB_WEBHOOK_SECRET) {
    throw new Error('GITHUB_WEBHOOK_SECRET not set')
  }

  const hmac = crypto.createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET)
  const actual = hmac.update(body).digest('hex')
  const digest = `sha256=${actual}`
  if (digest !== signature) {
    throw new Error(`Invalid signature, got ${signature}, expect ${actual}`)
  }
}

async function deploy() {
  try {
    // find the particular deployment
    const res = await k8sApi.readNamespacedDeployment(deploymentName, namespace)
    const deployment = res.body
    console.log(`Found deployment ${deployment.metadata.name}`)

    await rollout(deployment)
  } catch (err) {
    if (err.statusCode === 409) {
      console.log(`Deployment ${deploymentName} already exists, ignoring`)
      return
    }
    throw err
  }

}

/**
 *
 * @param {k8s.V1Deployment} deployment
 */
async function rollout(deployment) {
  deployment.spec.template.metadata.annotations['kubectl.kubernetes.io/restartedAt'] = new Date().toISOString()
  // replace
  await k8sApi.replaceNamespacedDeployment(deployment.metadata.name, deployment.metadata.namespace, deployment)
}

module.exports = router
