const Router = require('koa-router')
const Users = require('./routes/users.js')
const Contacts = require('./routes/contacts.js')
const SignUp = require('./routes/signup')
const Login = require('./routes/login')
const Me = require('./routes/me')
const Messages = require('./routes/messages')
const jwtMiddleware = require('koa-jwt')

const router = new Router()

router.get('/', async (ctx) => {
  ctx.body = 'Hello World'
})

router.use('/signup', SignUp.routes())
router.use('/login', Login.routes())

// Protect the following routes with JWT
router.use(jwtMiddleware({ secret: process.env.JWT_SECRET }))
router.use('/users', Users.routes())
router.use('/me', Me.routes())
router.use('/messages', Messages.routes())
router.use('/contacts', Contacts.routes())

module.exports = router
