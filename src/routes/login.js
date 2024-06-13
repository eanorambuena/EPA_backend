const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const { User } = require('../models')
const { assertRequiredFields, MissingFieldsException } = require('../services/assertRequiredFields')

const router = new Router()

router.post('/', async (ctx) => {
  try {
    assertRequiredFields(ctx.request.body, ['phoneNumber', 'password'])
    const { phoneNumber, password } = ctx.request.body
    console.log('phoneNumber', phoneNumber)
    console.log('password', password)
    const user = await User.findOne({ where: { phoneNumber, password } })
    if (!user) {
      ctx.status = 401
      ctx.body = { error: 'Invalid credentials' }
      return
    }
    const expirationSeconds = 1 * 60 * 60 * 24
    const JWT_PRIVATE_KEY = process.env.JWT_SECRET ?? 'secret'
    const token = jwt.sign(
      { scope: [user.type] },
      JWT_PRIVATE_KEY,
      { subject: user.id.toString() },
      { expiresIn: expirationSeconds }
    )
    ctx.body = {
      'access_token': token,
      'token_type': 'Bearer',
      'expires_in': expirationSeconds
    }
    ctx.status = 200
  }
  catch (error) {
    if (error instanceof MissingFieldsException) {
      ctx.body = { error: error.message }
      ctx.status = 400
      return
    }
    console.error(error)
    ctx.body = { error: 'Internal server error' }
    ctx.status = 500
  }
})

router.get('/currentUser', async (ctx) => {
  try {
    const token = ctx.request.headers.authorization.split(' ')[1]
    const { phoneNumber, password } = jwt.verify(token, 'secret')
    console.log('phoneNumber', phoneNumber)
    console.log('password', password)
    ctx.body = await User.findOne({ where: { phoneNumber, password } })
    ctx.status = 200
  }
  catch (error) {
    console.error(error)
    ctx.status = 401
    ctx.body = { error: 'Unauthorized' }
  }
})

module.exports = router
