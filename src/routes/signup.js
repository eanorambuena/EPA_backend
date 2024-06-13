const Router = require('koa-router')
const { User } = require('../models')
const { assertRequiredFields, MissingFieldsException } = require('../services/assertRequiredFields')

const router = new Router()

router.post('/', async (ctx) => {
  ctx.type = 'application/json'
  try {
    const { phoneNumber, password } = ctx.request.body
    assertRequiredFields(ctx.request.body, ['phoneNumber', 'password'])
    let user = await User.findOne({ where: { phoneNumber } })
    if (user) {
      ctx.status = 400
      ctx.body = { error: 'User already exists' }
      return
    }
    user = await User.create({ phoneNumber, password, type: 'user' })
    ctx.status = 201
    ctx.body = { message: 'User created' }
  }
  catch (error) {
    ctx.status = 500
    if (error instanceof MissingFieldsException) {
      ctx.body = { error: error.message }
      return
    }
    console.error(error)
    ctx.body = { error: 'Internal server error' }
  }
})

module.exports = router
