const Router = require('koa-router')
const { User } = require('../models')
const { assertRequiredFields } = require('../services/assertRequiredFields')
const bcrypt = require('bcrypt')
const Safely = require('../services/safely')
const { sendJwt } = require('../services/createJwt')
const { AuthenticationError, ItemNotFoundError } = require('../services/errors')

const router = new Router()

router.post('/', async ctx => Safely.Do(ctx, async (ctx) => {
  assertRequiredFields(ctx.request.body, ['phoneNumber', 'password'])
  const { phoneNumber, password } = ctx.request.body

  const user = await User.findOne({ where: { phoneNumber: phoneNumber } })
  if (!user) {
    throw new ItemNotFoundError('User')
  }
  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    throw new AuthenticationError()
  }
  sendJwt(ctx, user)
}))

module.exports = router
