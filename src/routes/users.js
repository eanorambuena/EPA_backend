const Router = require('koa-router');

const router = new Router();

router.get("users.list", "/", async (ctx) => {
    const users = await ctx.orm.User.findAll();
    ctx.body = users;
    });

router.get("users.show", "/:id", async (ctx) => {
    const user = await ctx.orm.User.findByPk(ctx.params.id);
    if (!user) {
        ctx.throw(404);
    }
    ctx.body = user;
    });

router.post("users.create", "", async (ctx) => {
    const user = await ctx.orm.User.create(ctx.request.body);
    ctx.body = user;
    });

router.put("users.update", "/:id", async (ctx) => {
    const user = await ctx.orm.User.findByPk(ctx.params.id);
    if (!user) {
        ctx.throw(404);
    }
    await user.update(ctx.request.body);
    ctx.body = user;
    }
);

router.del("users.delete", "/:id", async (ctx) => {
    const user = await ctx.orm.User.findByPk(ctx.params.id);
    if (!user) {
        ctx.throw(404);
    }
    await user.destroy();
    ctx.status = 204;
    }
);

module.exports = router;