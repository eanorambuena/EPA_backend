const Router = require('koa-router')
const Safely = require('../../services/safely')
const { assertRequiredFields } = require('../../services/assertRequiredFields')
const { isAdmin } = require('../../middleware/jwt')

const router = new Router()

router.get('messages.list', '', isAdmin, async ctx => Safely.Do(ctx, async (ctx) => {
  const messages = await ctx.state.db.Message.findAll()
  ctx.body = messages
  ctx.status = 200
}))

router.get('messages.chatlist', '/:chatid', async ctx => Safely.Do(ctx, async (ctx) => {
  const messages = await Safely.GetChatMessages(ctx, ctx.params.chatid)
  ctx.body = messages
  ctx.status = 200
}))

router.post('messages.create', '', isAdmin, async ctx => Safely.Do(ctx, async (ctx) => {
  await assertRequiredFields(ctx.request.body, ['chatId', 'senderId', 'content'])
  const message = await ctx.state.db.Message.create(ctx.request.body)
  ctx.body = message
  ctx.status = 201
}))

module.exports = router
