const { MissingFieldsException, ItemNotFoundException } = require('./errors')

async function GetUsers(ctx) {
  const users = await ctx.orm.User.findAll()
  users.map(user => user.password = undefined)
  return users
}

async function GetUser(ctx, id) {
  const user = await ctx.orm.User.findByPk(id)
  user.password = undefined
  if (!user) {
    throw new ItemNotFoundException('User')
  }
  return user
}

async function Do(ctx, action) {
  try {
    await action(ctx)
  }
  catch (error) {
    if (error instanceof ItemNotFoundException) {
      ctx.body = error.message
      ctx.status = 404
    }
    else if (error instanceof MissingFieldsException) {
      ctx.body = error.message
      ctx.status = 400
    }
    else {
      console.log(error)
      ctx.body = 'Internal server error'
      ctx.status = 500
    }
  }
}

module.exports = {
  GetUsers,
  GetUser,
  Do
}
