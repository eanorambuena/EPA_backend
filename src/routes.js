const Router = require('koa-router')
const auth = require('./routes/auth')
const Users = require('./routes/users.js')
const Messages = require('./routes/messages.js')

const router = new Router()

router.get('/', async (ctx) => {
  ctx.body = 'Hello World'
})

router.use('/auth', auth.routes())
router.use('/users', Users.routes())
router.use('/messages', Messages.routes())

module.exports = router
