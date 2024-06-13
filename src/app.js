const Koa = require('koa')
const KoaLogger = require('koa-logger')
const { koaBody } = require('koa-body')
const cors = require('@koa/cors')
const router = require('./routes.js')
const orm = require('./models')
const cors = require('@koa/cors');

const app = new Koa()

app.context.orm = orm

app.use(cors())
app.use(KoaLogger())
app.use(koaBody())
app.use(cors());

app.use(router.routes())

module.exports = app
