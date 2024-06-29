const Router = require('koa-router')
const Safely = require('../../services/safely')
const { assertRequiredFields } = require('../../services/assertRequiredFields')
const { isAdmin } = require('../../middleware/jwt')

const router = new Router()

router.get('messages.list', '/', isAdmin, async ctx => Safely.Do(ctx, async (ctx) => {
  const messages = await ctx.state.db.Message.findAll()
  ctx.body = messages
  ctx.status = 200
}))

router.get('messages.chatlist', '/:chatid', async ctx => Safely.Do(ctx, async (ctx) => {
  const messages = await Safely.GetChatMessages(ctx, ctx.params.chatid)
  ctx.body = messages
  ctx.status = 200
}))

router.post('messages.create', '/', async ctx => Safely.Do(ctx, async (ctx) => {
  await assertRequiredFields(ctx.request.body, ['chatId', 'userId', 'content'])
  ctx.body = await Safely.PostMessage(ctx, ctx.request.body.chatId)
  ctx.status = 201
}))

module.exports = router
