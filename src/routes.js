const Router = require('koa-router')
const auth = require('./routes/auth')

const router = new Router()

router.get('/', async (ctx) => {
  ctx.body = 'Hello World'
})

router.use('/auth', auth.routes())

module.exports = router
