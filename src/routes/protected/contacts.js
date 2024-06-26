const Router = require('koa-router')
const Safely = require('../../services/safely')
const { ItemNotFoundException } = require('../../services/errors')

const router = new Router()

router.get('/', async ctx => Safely.Do(ctx, async (ctx) => {
  const contacts = await Safely.GetAllContacts(ctx)
  ctx.body = contacts
  ctx.status = 200
}))

router.get('/:id', async ctx => Safely.Do(ctx, async (ctx) => {
  const contact = await Safely.GetContact(ctx, ctx.params.id)
  ctx.body = contact
  ctx.status = 200
}))

router.get('/user/:id', async ctx => Safely.Do(ctx, async (ctx) => {
  const contacts = await Safely.GetContacts(ctx, ctx.params.id)
  ctx.body = contacts
  ctx.status = 200
}))

router.post('/', async (ctx) => {
  await Safely.Do(ctx, async (ctx) => {
    const contact = await Safely.PostContact(ctx)
    ctx.body = contact
    ctx.status = 201
  })
})

router.put('/:id', async ctx => Safely.Do(ctx, async (ctx) => {
  const contact = await Safely.PutContact(ctx, ctx.params.id)
  if (!contact) {
    throw new ItemNotFoundException('Contact')
  }
  await contact.update(ctx.request.body)
  ctx.body = contact
  ctx.status = 200
}))

router.del('/:id', async ctx => Safely.Do(ctx, async (ctx) => {
  await Safely.DelContact(ctx, ctx.params.id)
  ctx.status = 204
}))

module.exports = router
