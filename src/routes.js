const Router = require('koa-router')
const SignUp = require('./routes/signup')
const Login = require('./routes/login')
const Users = require('./routes/users')
const Messages = require('./routes/messages')

const router = new Router()

router.use('/signup', SignUp.routes())
router.use('/login', Login.routes())
router.use('/users', Users.routes())
router.use('/messages', Messages.routes())

module.exports = router
