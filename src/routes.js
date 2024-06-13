const Router = require('koa-router')
const SignUp = require('./routes/signup')
const Login = require('./routes/login')
const Users = require('./routes/users')
const Me = require('./routes/me')
const Messages = require('./routes/messages')
const jwtMiddleware = require('koa-jwt')

const router = new Router()

router.use('/signup', SignUp.routes())
router.use('/login', Login.routes())

// Protect the following routes with JWT
router.use(jwtMiddleware({ secret: process.env.JWT_SECRET }))
router.use('/users', Users.routes())
router.use('/me', Me.routes())
router.use('/messages', Messages.routes())

module.exports = router
