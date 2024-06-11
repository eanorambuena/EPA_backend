const Koa = require('koa')
const KoaLogger = require('koa-logger')
const { koaBody } = require('koa-body')
const router = require('./routes.js')
const orm = require('./models')

const app = new Koa()

app.context.orm = orm

app.use(KoaLogger())
app.use(koaBody())

app.use(router.routes())

app.use((ctx) => {
  ctx.body = 'Hello World'
})

// app.listen(3000, () => {console.log('Server running on http://localhost:3000')
// });

console.log('Hello World')

module.exports = app
