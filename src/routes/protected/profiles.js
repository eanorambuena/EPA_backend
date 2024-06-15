const Router = require('koa-router')
const Safely = require('../../services/safely')
const { isAdmin } = require('../../middleware/jwt')
const { ItemNotFoundError } = require('../../services/errors')
const { assertRequiredFields } = require('../../services/assertRequiredFields')

const router = new Router()

router.get('profiles.list', '/', isAdmin, async ctx => Safely.Do(ctx, async (ctx) => {
  const profiles = await ctx.orm.Profile.findAll()
  ctx.body = profiles
  ctx.status = 200
}))

router.get('profiles.show', '/:userId', async ctx => Safely.Do(ctx, async (ctx) => {
  const profile = await ctx.orm.Profile.findOne({ where: { userId: ctx.params.userId } })
  if (!profile) {
    console.log('Profile not found userId:', ctx.params.userId)
    throw new ItemNotFoundError('Profile')
  }
  ctx.body = profile
  ctx.status = 200
}))

router.patch('profiles.update', '/:userId', async ctx => Safely.Do(ctx, async (ctx) => {
  const profile = await ctx.orm.Profile.findOne({ where: { userId: ctx.params.userId } })
  if (!profile) {
    throw new ItemNotFoundError('Profile')
  }
  await profile.update(ctx.request.body)
  ctx.body = profile
  ctx.status = 200
}))

router.post('profiles.create', '/', async ctx => Safely.Do(ctx, async (ctx) => {
  await assertRequiredFields(ctx.request.body, ['username', 'email', 'status', 'description', 'image', 'userId'])
  const profile = await ctx.orm.Profile.create(ctx.request.body)
  ctx.body = profile
  ctx.status = 201
}))

module.exports = router
