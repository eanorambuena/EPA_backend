const { MissingFieldsException } = require('./assertRequiredFields')

async function safelyGetUsers(ctx) {
  const users = await ctx.orm.User.findAll()
  users.map(user => user.password = undefined)
  return users
}

async function safelyGetUser(ctx, id) {
  const user = await ctx.orm.User.findByPk(id)
  user.password = undefined
  if (!user) {
    ctx.throw(404)
  }
  return user
}

async function safelyDo(ctx, action) {
  try {
    await action(ctx)
  }
  catch (error) {
    if (error instanceof MissingFieldsException) {
      ctx.body = error.message
      ctx.status = 400
      return
    }
    console.log(error)
    ctx.body = 'Internal server error'
    ctx.status = 500
  }
}

module.exports = {
  safelyGetUsers,
  safelyGetUser,
  safelyDo
}
