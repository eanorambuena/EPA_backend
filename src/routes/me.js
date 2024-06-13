const Router = require('koa-router')
const { safelyGetUser, safelyDo } = require('../services/safely')

const router = new Router()

router.get('/', async ctx => safelyDo(ctx, async (ctx) => {
  console.log('ctx.state.user', ctx.state.user.sub)
  const user = await safelyGetUser(ctx, ctx.state.user.sub)
  ctx.body = user
  ctx.status = 200
}))

module.exports = router
