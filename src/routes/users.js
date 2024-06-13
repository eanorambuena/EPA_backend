const Router = require('koa-router')

const router = new Router()

router.get('users.list', '/', async (ctx) => {
  try {
    const users = await ctx.orm.User.findAll()
    ctx.body = users
    ctx.status = 200
  }
  catch (error) {
    console.log(error)
    ctx.body = error
    ctx.status = 500
  }
})

router.get('users.show', '/:id', async (ctx) => {
  try {
    const user = await ctx.orm.User.findByPk(ctx.params.id)
    if (!user) {
      ctx.throw(404)
    }
    ctx.body = user
    ctx.status = 200
  }
  catch (error) {
    console.log(error)
    ctx.body = error
    ctx.status = 500
  }
})

router.post('users.create', '', async (ctx) => {
  try {
    const user = await ctx.orm.User.create(ctx.request.body)
    ctx.body = user
    ctx.status = 201
  }
  catch (error) {
    console.log(error)
    ctx.body = error
    ctx.status = 400
  }
})

router.put('users.update', '/:id', async (ctx) => {
  try {
    const user = await ctx.orm.User.findByPk(ctx.params.id)
    if (!user) {
      ctx.throw(404)
    }
    await user.update(ctx.request.body)
    ctx.body = user
    ctx.status = 200
  }
  catch (error) {
    console.log(error)
    ctx.body = error
    ctx.status = 500
  }
}
)

router.del('users.delete', '/:id', async (ctx) => {
  try {
    const user = await ctx.orm.User.findByPk(ctx.params.id)
    if (!user) {
      ctx.throw(404)
    }
    await user.destroy()
    ctx.status = 204
  }
  catch (error) {
    console.log(error)
    ctx.body = error
    ctx.status = 500
  }
})

module.exports = router
