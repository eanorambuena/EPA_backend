const Router = require('koa-router')

const router = new Router()

router.get('/', async (ctx) => {
  try {
    const contacts = await ctx.orm.Contact.findAll()
    ctx.body = contacts
    ctx.status = 200
  }
  catch (error) {
    console.log(error)
    ctx.body = error
    ctx.status = 500
  }
})

router.get('/:id', async (ctx) => {
  try {
    const contact = await ctx.orm.Contact.findByPk(ctx.params.id)
    if (!contact) {
      ctx.throw(404)
    }
    ctx.body = contact
    ctx.status = 200
  }
  catch (error) {
    console.log(error)
    ctx.body = error
    ctx.status = 500
  }
})

router.post('/', async (ctx) => {
  try {
    const contact = await ctx.orm.Contact.create(ctx.request.body)
    ctx.body = contact
    ctx.status = 201
  }
  catch (error) {
    console.log(error)
    ctx.body = error
    ctx.status = 400
  }
})

router.put('/:id', async (ctx) => {
  try {
    const contact = await ctx.orm.Contact.findByPk(ctx.params.id)
    if (!contact) {
      ctx.throw(404)
    }
    await contact.update(ctx.request.body)
    ctx.body = contact
    ctx.status = 200
  }
  catch (error) {
    console.log(error)
    ctx.body = error
    ctx.status = 500
  }
})

router.del('/:id', async (ctx) => {
  try {
    const contact = await ctx.orm.Contact.findByPk(ctx.params.id)
    if (!contact) {
      ctx.throw(404)
    }
    await contact.destroy()
    ctx.status = 204
  }
  catch (error) {
    console.log(error)
    ctx.body = error
    ctx.status = 500
  }
})

module.exports = router
