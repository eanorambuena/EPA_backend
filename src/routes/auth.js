const Router = require('koa-router')
const jwt = require('jsonwebtoken')
// const { User } = require('../models')

const router = new Router()

router.post('/signin', async (ctx) => {
  try {
    const { email, password } = ctx.request.body
    console.log('email', email)
    console.log('password', password)
    const isCorrect = true // await User.findOne({ where: { email, password } })
    if (!isCorrect) {
      ctx.status = 401
      ctx.body = { error: 'Invalid credentials' }
      return
    }
    ctx.body = { token: jwt.sign({
      email,
      password
    }, 'secret') }
    ctx.status = 200
  }
  catch (error) {
    console.error(error)
    ctx.status = 500
    ctx.body = { error: 'Internal server error' }
  }
})

router.post('/signup', async (ctx) => {
  try {
    const { email, password } = ctx.request.body
    console.log('email', email)
    console.log('password', password)
    // await User.create({ email, password })
    ctx.status = 201
    ctx.body = { message: 'User created' }
  }
  catch (error) {
    console.error(error)
    ctx.status = 500
    ctx.body = { error: 'Internal server error' }
  }
})

router.get('/currentUser', async (ctx) => {
  try {
    const token = ctx.request.headers.authorization.split(' ')[1]
    const { email, password } = jwt.verify(token, 'secret')
    console.log('email', email)
    console.log('password', password)
    ctx.body = { email } // await User.findOne({ where: { email, password } })
    ctx.status = 200
  }
  catch (error) {
    console.error(error)
    ctx.status = 401
    ctx.body = { error: 'Unauthorized' }
  }
})

module.exports = router
