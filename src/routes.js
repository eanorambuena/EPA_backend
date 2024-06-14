const Router = require('koa-router')
const SignUp = require('./routes/signup')
const Login = require('./routes/login')
const Users = require('./routes/protected/users.js')
const Contacts = require('./routes/protected/contacts.js')
const Chats = require('./routes/protected/chats.js')
const Me = require('./routes/protected/me.js')
const Messages = require('./routes/protected/messages.js')
const Profiles = require('./routes/protected/profiles.js')
const jwtMiddleware = require('koa-jwt')

const router = new Router()

router.get('/', async (ctx) => {
  ctx.body = 'Hello World'
})

router.use('/login', Login.routes())
router.use('/signup', SignUp.routes())

// Protect the following routes with JWT
router.use(jwtMiddleware({ secret: process.env.JWT_SECRET }))
router.use('/chats', Chats.routes())
router.use('/contacts', Contacts.routes())
router.use('/me', Me.routes())
router.use('/messages', Messages.routes())
router.use('/profiles', Profiles.routes())
router.use('/users', Users.routes())

module.exports = router
