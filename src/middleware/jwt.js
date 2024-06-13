const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

function getJwtScope(token) {
  return jwt.verify(token, JWT_SECRET).scope
}

async function isUserOfScopes(ctx, next, scopes) {
  if (!ctx.request.headers.authorization) {
    ctx.throw(401, 'Unauthorized')
  }
  await next()
  const token = ctx.request.headers.authorization.split(' ')[1]
  const scope = getJwtScope(token)
  const canAccess = scopes.some(scope.includes)
  console.log('scope', scope, 'canAccess', canAccess, 'required scopes', scopes)
  ctx.assert(canAccess, 403, `Forbidden: required scopes ${scopes}`)
}

async function isUser(ctx, next) {
  await isUserOfScopes(ctx, next, ['user'])
}

async function isAdmin(ctx, next) {
  await isUserOfScopes(ctx, next, ['admin'])
}

async function isUserOrAdmin(ctx, next) {
  await isUserOfScopes(ctx, next, ['user', 'admin'])
}

module.exports = {
  isUser, isAdmin, isUserOrAdmin
}
