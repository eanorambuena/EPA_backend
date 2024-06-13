const Router = require('koa-router')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

const router = new Router()

router.post('/', async (ctx) => {
  try {
    const { phoneNumber, password } = ctx.request.body
    console.log('phoneNumber', phoneNumber)
    console.log('password', password)
    const isCorrect = await User.findOne({ where: { email, password } })
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

router.get('/currentUser', async (ctx) => {
  try {
    const token = ctx.request.headers.authorization.split(' ')[1]
    const { phoneNumber, password } = jwt.verify(token, 'secret')
    console.log('phoneNumber', phoneNumber)
    console.log('password', password)
    ctx.body = await User.findOne({ where: { phoneNumber, password } })
    ctx.status = 200
  }
  catch (error) {
    console.error(error)
    ctx.status = 401
    ctx.body = { error: 'Unauthorized' }
  }
})

module.exports = router
