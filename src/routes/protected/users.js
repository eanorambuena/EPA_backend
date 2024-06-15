const Router = require('koa-router')
const { isAdmin } = require('../../middleware/jwt')
const Safely = require('../../services/safely')
const { assertRequiredFields } = require('../../services/assertRequiredFields')

const router = new Router()

router.get('users.list', '/', async ctx => Safely.Do(ctx, async (ctx) => {
  const users = await Safely.GetUsers(ctx)
  ctx.body = users
  ctx.status = 200
}))

router.get('users.show', '/:id', async ctx => Safely.Do(ctx, async (ctx) => {
  const user = await Safely.GetUser(ctx, ctx.params.id)
  ctx.body = user
  ctx.status = 200
}))

router.post('users.create', '', isAdmin, async ctx => Safely.Do(ctx, async (ctx) => {
  await assertRequiredFields(ctx.request.body, ['phoneNumber', 'password', 'type'])
  const user = await ctx.orm.User.create(ctx.request.body)
  ctx.body = user
  ctx.status = 201
}))

router.put('users.update', '/:id', async ctx => Safely.Do(ctx, async (ctx) => {
  const user = await Safely.GetUser(ctx, ctx.params.id)
  await user.update(ctx.request.body)
  ctx.body = user
  ctx.status = 200
}))

router.del('users.delete', '/:id', async ctx => Safely.Do(ctx, async (ctx) => {
  ctx.body = await Safely.DelUser(ctx, ctx.params.id)
  ctx.status = 204
}))

router.get('users.chats', '/:id/chats', async ctx => Safely.Do(ctx, async (ctx) => {
  const chats = await Safely.GetChats(ctx)
  ctx.body = chats
  ctx.status = 200
}))

module.exports = router
