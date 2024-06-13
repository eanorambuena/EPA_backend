const Router = require('koa-router')
const Safely = require('../services/safely')

const router = new Router()

router.get('/', async ctx => Safely.Do(ctx, async (ctx) => {
  console.log('ctx.state.user', ctx.state.user.sub)
  const user = await Safely.GetUser(ctx, ctx.state.user.sub)
  ctx.body = user
  ctx.status = 200
}))

module.exports = router
