const Router = require('koa-router')
const { User } = require('../models')
const { assertRequiredFields } = require('../services/assertRequiredFields')
const bcrypt = require('bcrypt')
const Safely = require('../services/safely')
const { sendJwt } = require('../services/createJwt')

const router = new Router()

router.post('/', async ctx => Safely.Do(ctx, async (ctx) => {
  assertRequiredFields(ctx.request.body, ['phoneNumber', 'password'])
  const { phoneNumber, password } = ctx.request.body
  console.log('phoneNumber', phoneNumber)
  console.log('password', password)

  const user = await User.findOne({ where: { phoneNumber: phoneNumber } })

  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
    ctx.body = { error: 'Invalid credentials' }
    ctx.status = 401
    return
  }
  sendJwt(ctx, user)
}))

module.exports = router
