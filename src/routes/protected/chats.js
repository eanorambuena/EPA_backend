const Router = require('koa-router')
const Safely = require('../../services/safely')

const router = new Router()

router.get('chats.list', '/', async ctx => Safely.Do(ctx, async (ctx) => {
  const chats = await Safely.GetChats(ctx)
  ctx.body = chats
  ctx.status = 200
}))

router.get('chats.show', '/:id', async ctx => Safely.Do(ctx, async (ctx) => {
  const chat = await Safely.GetChat(ctx, ctx.params.id)
  ctx.body = chat
  ctx.status = 200
}))

router.get('chats.messages', '/:id/messages', async ctx => Safely.Do(ctx, async (ctx) => {
  const messages = await Safely.GetChatMessages(ctx, ctx.params.id)
  ctx.body = messages
  ctx.status = 200
}))

router.get('chats.members', '/:id/members', async ctx => Safely.Do(ctx, async (ctx) => {
  const chatMembers = await Safely.GetChatMembers(ctx, ctx.params.id)
  ctx.body = chatMembers
  ctx.status = 200
}))

router.patch('chats.update', '/:id', async ctx => Safely.Do(ctx, async (ctx) => {
  const chat = await Safely.PatchChat(ctx, ctx.params.id)
  ctx.body = chat
  ctx.status = 200
}))

router.post('chats.create', '/', async ctx => Safely.Do(ctx, async (ctx) => {
  const chat = await Safely.PostChat(ctx)
  ctx.body = chat
  ctx.status = 201
}))

router.patch('chats.member.leave', '/leave/:id', async ctx => Safely.Do(ctx, async (ctx) => {
  const user = await Safely.GetCurrentUser(ctx)
  await Safely.LeaveChat(ctx, user, ctx.params.id)
  ctx.status = 204
}))

module.exports = router
