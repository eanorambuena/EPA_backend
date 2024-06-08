const Router = require('koa-router');
const Users = require('./routes/users.js');
const Messages = require('./routes/messages.js');

const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'Hello World';
});

router.use('/users', Users.routes());
router.use('/messages', Messages.routes());

module.exports = router;