const { Router } = require('express')
const router = Router()
const crypto = require('crypto')

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

    const { package } = req.body

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

}

module.exports = router
