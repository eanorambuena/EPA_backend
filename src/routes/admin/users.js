const Router = require('koa-router')
const { isAdmin } = require('../../middleware/jwt')
const Safely = require('../../services/safely')
const { assertRequiredFields } = require('../../services/assertRequiredFields')

const router = new Router()

router.get('users.list', '/', isAdmin, async ctx => Safely.Do(ctx, async (ctx) => {
  const users = await Safely.GetUsers(ctx)
  ctx.body = users
  ctx.status = 200
}))

router.get('users.show', '/:id', isAdmin, async ctx => Safely.Do(ctx, async (ctx) => {
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

router.put('users.update', '/:id', isAdmin, async ctx => Safely.Do(ctx, async (ctx) => {
  const user = await Safely.GetUser(ctx, ctx.params.id)
  await user.update(ctx.request.body)
  ctx.body = user
  ctx.status = 200
}))

router.del('users.delete', '/:id', isAdmin, async ctx => Safely.Do(ctx, async (ctx) => {
  const user = await Safely.GetUser(ctx, ctx.params.id)
  await user.destroy()
  ctx.status = 204
}))

module.exports = router
