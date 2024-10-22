const Router = require('koa-router')
const { User } = require('../models')
const { assertRequiredFields } = require('../services/assertRequiredFields')
const bcrypt = require('bcrypt')
const Safely = require('../services/safely')

const router = new Router()

router.post('/', async ctx => Safely.Do(ctx, async (ctx) => {
  assertRequiredFields(ctx.request.body, ['phoneNumber', 'password'])
  const { phoneNumber, password } = ctx.request.body
  let user = await User.findOne({ where: { phoneNumber } })
  if (user) {
    ctx.body = { error: 'User already exists' }
    ctx.status = 400
    return
  }

  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  user = await User.create({ phoneNumber, password: hashedPassword, type: 'user' })
  ctx.body = { message: 'User created' }
  ctx.status = 201
}))

module.exports = router
