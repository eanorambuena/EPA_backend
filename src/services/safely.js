const { ApplicationError, AuthenticationError, AuthorizationError, ItemNotFoundError } = require('./errors')

module.exports = class Safely {
  static async Do(ctx, action) {
    try {
      await action(ctx)
    }
    catch (error) {
      if (error instanceof ApplicationError) {
        ctx.body = error.message
        ctx.status = error.status
      }
      else {
        console.log(error)
        ctx.body = 'Internal server error'
        ctx.status = 500
      }
    }
  }

  static async GetChat(ctx, id) {
    const chat = await ctx.orm.Chat.findByPk(id)
    const user = await this.GetCurrentUser(ctx)
    const chatmember = await ctx.orm.Chatmember.findOne({ where: { chatId: id, userId: user.id } })
    if (!chatmember && !this.IsAdmin(user)) {
      throw new AuthorizationError()
    }
    if (!chat) {
      throw new ItemNotFoundError('Chat')
    }
    return chat
  }

  static async GetCurrentUser(ctx) {
    const user = await ctx.orm.User.findByPk(ctx.state.user.sub)
    if (!user) {
      throw new AuthenticationError()
    }
    user.password = undefined
    return user
  }

  static async GetUsers(ctx) {
    const users = await ctx.orm.User.findAll()
    users.map(user => user.password = undefined)
    return users
  }

  static async GetUser(ctx, id) {
    const user = await ctx.orm.User.findByPk(id)
    if (!user) {
      throw new ItemNotFoundError('User')
    }
    user.password = undefined
    return user
  }

  static IsAdmin(user) {
    return user.type === 'admin'
  }
}
