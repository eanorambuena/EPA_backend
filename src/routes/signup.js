const Router = require('koa-router')
const { User } = require('../models')
const { assertRequiredFields, MissingFieldsException } = require('../services/assertRequiredFields')

const router = new Router()

router.post('/', async (ctx) => {
  ctx.type = 'application/json'
  try {
    assertRequiredFields(ctx.request.body, ['phoneNumber', 'password'])
    const { phoneNumber, password } = ctx.request.body
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

module.exports = router
