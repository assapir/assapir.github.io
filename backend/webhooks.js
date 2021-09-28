const { Router } = require('express')
const { Client } = require('kubernetes-client')
const router = Router()
const crypto = require('crypto')
const axios = require('axios').default

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
  const client = new Client({ version: '1.14' })

  try {
    const getManifest = await axios.get('https://raw.githubusercontent.com/assapir/assapir.github.io/main/deployment.yaml')
    const body = getManifest.data
    const create = await client.apis.apps.v1.namespaces('default').deployments.post({ body })
    console.log('Create:', create)
  } catch (err) {
    if (err.code !== 409) throw err
  }

}

module.exports = router
