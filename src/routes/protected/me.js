const Router = require('koa-router')
const Safely = require('../../services/safely')

const router = new Router()

router.get('/', async ctx => Safely.Do(ctx, async (ctx) => {
  const user = await Safely.GetCurrentUser(ctx)
  ctx.body = user
  ctx.status = 200
}))

module.exports = router
