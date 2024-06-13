const jwt = require('jsonwebtoken')

const EXPIRATION_SECONDS = 1 * 60 * 60 * 24
const JWT_PRIVATE_KEY = process.env.JWT_SECRET

function sendJwt(ctx, user) {
  const token = createJwt(user)
  ctx.body = {
    access_token: token,
    token_type: 'Bearer',
    expires_in: EXPIRATION_SECONDS
  }
  ctx.status = 200
}

function createJwt(user) {
  return jwt.sign(
    { scope: [user.type] },
    JWT_PRIVATE_KEY,
    { subject: user.id.toString() },
    { expiresIn: EXPIRATION_SECONDS }
  )
}

module.exports = {
  sendJwt
}
