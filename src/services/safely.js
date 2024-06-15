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
    const isChatMember = await this.IsChatMember(ctx, user, id)
    if (!isChatMember) {
      throw new AuthorizationError()
    }
    if (!chat) {
      throw new ItemNotFoundError('Chat')
    }
    return chat
  }

  static async GetChatMessages(ctx, chatId) {
    const messages = await ctx.orm.Message.findAll({ where: { chatId } })
    const user = await this.GetCurrentUser(ctx)
    const isChatMember = await this.IsChatMember(ctx, user, chatId)
    if (!isChatMember) {
      throw new AuthorizationError()
    }
    if (!messages) {
      throw new ItemNotFoundError('Message')
    }
    return messages
  }

  static async GetChats(ctx) {
    const user = await this.GetCurrentUser(ctx)
    const chatMembers = await ctx.orm.ChatMember.findAll({ where: { userId: user.id } })
    const chatIds = chatMembers.map(chatmember => chatmember.chatId)
    return await ctx.orm.Chat.findAll({ where: { id: chatIds } })
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

  static async IsChatMember(ctx, user, chatId) {
    return !!await ctx.orm.ChatMember.findOne({ where: { chatId, userId: user.id } })
  }
}
