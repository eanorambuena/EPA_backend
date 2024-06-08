const Router = require('koa-router');

const router = new Router();

router.get('', async (ctx) => {
    const messages = await ctx.state.db.Message.findAll();
    ctx.body = messages;
    });

router.get('/:chatid', async (ctx) => {
    const messages = await ctx.state.db.Message.findAll({
        where: {
            chatId: ctx.params.chatid
        }
    });
    ctx.body = messages;
});

router.post('', async (ctx) => {
    const message = await ctx.state.db.Message.create({
        chatId: ctx.params.chatId,
        content: ctx.request.body.content,
        userId: ctx.request.body.userId,
        state: 'sent',
        date: new Date(),
    });
    ctx.body = message;
});

module.exports = router;