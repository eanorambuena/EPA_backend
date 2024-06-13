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

module.exports = app
