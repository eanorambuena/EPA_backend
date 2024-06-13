const Router = require('koa-router')

const router = new Router()

router.get('messages.list', '', async (ctx) => {
  try {
    const messages = await ctx.state.db.Message.findAll()
    ctx.body = messages
  }
  catch (error) {
    console.log(error)
    ctx.body = error
    ctx.status = 500
  }
})

router.get('messages.chatlist', '/:chatid', async (ctx) => {
  try {
    const messages = await ctx.state.db.Message.findAll({
      where: {
        chatId: ctx.params.chatid
      }
    })
    ctx.body = messages
  }
  catch (error) {
    console.log(error)
    ctx.body = error
    ctx.status = 500
  }
})

router.post('messages.create', '', async (ctx) => {
  try {
    const message = await ctx.state.db.Message.create(ctx.request.body)
    ctx.body = message
    ctx.status = 201
  }
  catch (error) {
    console.log(error)
    ctx.body = error
    ctx.status = 400
  }
})

module.exports = router
