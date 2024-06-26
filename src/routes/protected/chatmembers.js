const Router = require('koa-router')
const Safely = require('../../services/safely')

const router = new Router()

router.get('chatmembers.in.chat', '/:id', async ctx => {
    const chatMembers = await Safely.GetChatMembers(ctx, ctx.params.id)
    ctx.body = chatMembers
    ctx.status = 200
})

router.post('add.chatmember', '/:id', async ctx => {
    const chatMember = await Safely.AddChatMember(ctx, ctx.params.id)
    ctx.body = chatMember
    ctx.status = 201
})


module.exports = router
