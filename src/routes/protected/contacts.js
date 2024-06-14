const Router = require('koa-router')
const Safely = require('../../services/safely')
const { isAdmin } = require('../../middleware/jwt')
const { ItemNotFoundException } = require('../../services/errors')

const router = new Router()

router.get('/', isAdmin, async ctx => Safely.Do(ctx, async (ctx) => {
  const contacts = await ctx.orm.Contact.findAll()
  ctx.body = contacts
  ctx.status = 200
}))

router.get('/:id', isAdmin, async ctx => Safely.Do(ctx, async (ctx) => {
  const contact = await ctx.orm.Contact.findByPk(ctx.params.id)
  if (!contact) {
    throw new ItemNotFoundException('Contact')
  }
  ctx.body = contact
  ctx.status = 200
}))

router.get('/user/:id', async ctx => Safely.Do(ctx, async (ctx) => {
  const contacts = await ctx.orm.Contact.findAll({
    where: {
      userBase: ctx.params.id
    }
  })
  ctx.body = contacts
  ctx.status = 200
}))

router.post('/', isAdmin, async ctx => Safely.Do(ctx, async (ctx) => {
  const contact = await ctx.orm.Contact.create(ctx.request.body)
  ctx.body = contact
  ctx.status = 201
}))

router.post('/user/:id', async ctx => Safely.Do(ctx, async (ctx) => {
  const contact = await ctx.orm.Contact.create({
    ...ctx.request.body,
    userBase: ctx.params.id
  })
  ctx.body = contact
  ctx.status = 201
}))

router.put('/:id', isAdmin, async ctx => Safely.Do(ctx, async (ctx) => {
  const contact = await ctx.orm.Contact.findByPk(ctx.params.id)
  if (!contact) {
    throw new ItemNotFoundException('Contact')
  }
  await contact.update(ctx.request.body)
  ctx.body = contact
  ctx.status = 200
}))

router.put('/user/:id/', async ctx => Safely.Do(ctx, async (ctx) => {
  const contact = await ctx.orm.Contact.findOne({
    where: {
      userBase: ctx.params.id,
      userContact: ctx.request.body.userContact
    }
  })
  if (!contact) {
    throw new ItemNotFoundException('Contact')
  }
  await contact.update(ctx.request.body)
  ctx.body = contact
  ctx.status = 200
}))

router.del('/:id', isAdmin, async ctx => Safely.Do(ctx, async (ctx) => {
  const contact = await ctx.orm.Contact.findByPk(ctx.params.id)
  if (!contact) {
    throw new ItemNotFoundException('Contact')
  }
  await contact.destroy()
  ctx.status = 204
}))

router.del('/user/:id', async ctx => Safely.Do(ctx, async (ctx) => {
  const contact = await ctx.orm.Contact.findOne({
    where: {
      userBase: ctx.params.id,
      userContact: ctx.request.body.userContact
    }
  })
  if (!contact) {
    throw new ItemNotFoundException('Contact')
  }
  await contact.destroy()
  ctx.status = 204
}))

module.exports = router
