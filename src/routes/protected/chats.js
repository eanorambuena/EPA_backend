const Router = require('koa-router')
const Safely = require('../../services/safely')

const router = new Router()

router.get('/:id', async ctx => Safely.Do(ctx, async (ctx) => {
  const chat = await Safely.GetChat(ctx, ctx.params.id)
  ctx.body = chat
  ctx.status = 200
}))

module.exports = router
