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
    const user = await Safely.GetCurrentUser(ctx)
    const isChatMember = await Safely.IsChatMember(ctx, user, id)
    if (!isChatMember) {
      throw new AuthorizationError()
    }
    if (!chat) {
      throw new ItemNotFoundError('Chat')
    }
    return chat
  }

  static async GetChatMembers(ctx, chatId) {
    const chat = await Safely.GetChat(ctx, chatId)
    if (!chat) {
      throw new AuthorizationError()
    }
    const chatMembers = await ctx.orm.ChatMember.findAll({ where: { chatId } })
    chatMembers.map(chatMember => chatMember.password = undefined)
    return chatMembers
  }

  static async GetChatMessages(ctx, chatId) {
    const messages = await ctx.orm.Message.findAll({ where: { chatId } })
    const user = await Safely.GetCurrentUser(ctx)
    const isChatMember = await Safely.IsChatMember(ctx, user, chatId)
    if (!isChatMember) {
      throw new AuthorizationError()
    }
    if (!messages) {
      throw new ItemNotFoundError('Message')
    }
    return messages
  }

  static async GetChats(ctx) {
    const user = await Safely.GetCurrentUser(ctx)
    const chatMembers = await ctx.orm.ChatMember.findAll({ where: { userId: user.id } })
    const chatIds = chatMembers.map(chatmember => chatmember.chatId)
    return await ctx.orm.Chat.findAll({ where: { id: chatIds } })
  }

  static async GetAllContacts(ctx) {
    const contacts = await ctx.orm.Contact.findAll()
    if (!contacts) {
      throw new ItemNotFoundError('Contacts')
    }
    if (!Safely.IsAdmin(ctx.state.user)) {
      throw new AuthorizationError()
    }
    return contacts
  }

  static async GetContacts(ctx) {
    const user = await Safely.GetCurrentUser(ctx)
    const contacts = await ctx.orm.Contact.findAll({ where: { userBase: user.id } })
    if (!contacts) {
      throw new ItemNotFoundError('Contacts')
    }
    return contacts
  }

  static async GetContact(ctx, id) {
    const contact = await ctx.orm.Contact.findByPk(id)
    if (!contact) {
      throw new ItemNotFoundError('Contact')
    }
    if (contact.userBase !== ctx.state.user.id && !Safely.IsAdmin(ctx.state.user)) {
      throw new AuthorizationError()
    }
    return contact
  }

  static async PostContact(ctx) {
    if (!Safely.IsAdmin(ctx.state.user) && ctx.request.body.userBase !== ctx.state.user.id) {
      throw new AuthorizationError()
    }
    if (ctx.request.body.userBase === ctx.request.body.userContact) {
      throw new ApplicationError('User cannot add themselves as a contact', 400)
    }
    const contact = await ctx.orm.Contact.create(ctx.request.body)
    return contact
  }

  static async PutContact(ctx, id) {
    const contact = await Safely.GetContact(ctx, id)
    if (!contact) {
      throw new ItemNotFoundError('Contact')
    }
    if (contact.userBase !== ctx.state.user.id && !Safely.IsAdmin(ctx.state.user)) {
      throw new AuthorizationError()
    }
    await contact.update(ctx.request.body)
    return contact
  }

  static async DelContact(ctx, id) {
    const contact = await Safely.GetContact(ctx, id)
    if (!contact) {
      throw new ItemNotFoundError('Contact')
    }
    if (contact.userBase !== ctx.state.user.id && !Safely.IsAdmin(ctx.state.user)) {
      throw new AuthorizationError()
    }
    await contact.destroy()
  }

  static async DelUser(ctx, id) {
    const user = await Safely.GetUser(ctx, id)
    if (!user) {
      throw new ItemNotFoundError('User')
    }
    const currentUser = await Safely.GetCurrentUser(ctx)
    if (!currentUser) {
      throw new AuthenticationError()
    }
    if (!Safely.IsAdmin(ctx.state.user) && user.id !== currentUser.id) {
      throw new AuthorizationError()
    }
    const profile = await ctx.orm.Profile.findOne({ where: { userId: user.id } })
    if (profile) {
      const profileResponse = await profile.destroy()
      if (!profileResponse) {
        throw new ApplicationError('Could not delete profile', 500)
      }
    }
    return await user.destroy()
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
    return user.scope === 'admin'
  }

  static async IsChatMember(ctx, user, chatId) {
    return !!await ctx.orm.ChatMember.findOne({ where: { chatId, userId: user.id } })
  }

  static async PostMessage(ctx, chatId) {
    const user = await Safely.GetCurrentUser(ctx)
    const isChatMember = await Safely.IsChatMember(ctx, user, chatId)
    if (!isChatMember || Safely.IsAdmin(ctx.state.user)) {
      throw new AuthorizationError()
    }
    const message = await ctx.orm.Message.create({ ...ctx.request.body, userId: user.id, chatId })
    return message
  }
}
