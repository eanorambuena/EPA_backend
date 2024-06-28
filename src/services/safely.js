const { ApplicationError, AuthenticationError, AuthorizationError, ItemNotFoundError, ExistingEntityError } = require('./errors')

module.exports = class Safely {
  static async Do(ctx, action) {
    try {
      await action(ctx)
    }
    catch (error) {
      if (error instanceof ApplicationError) {
        console.log(`ApplicationError caught: ${error.message}`)
        ctx.body = error.message
        ctx.status = error.status
      }
      else {
        console.log('Unexpected error:', error)
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

  static async GetChatMembers(ctx, chatId) {
    const chat = await this.GetChat(ctx, chatId)
    if (!chat) {
      throw new AuthorizationError()
    }
    const chatMembers = await ctx.orm.ChatMember.findAll({ where: { chatId } })
    chatMembers.map(chatMember => chatMember.password = undefined)
    return chatMembers
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


  static async PatchChat(ctx, id) {
    const chat = await Safely.GetChat(ctx, id)
    const user = await Safely.GetUser(ctx, ctx.state.user.sub)
    if (!chat || !user) {
      throw new ItemNotFoundError('Chat')
    }
    const chatmember = await ctx.orm.ChatMember.findOne({ where: { chatId: chat.id, userId: user.id } })
    if (!this.IsAdmin(user) && chatmember.role != 'owner') {
      throw new AuthorizationError()
    }
    console.log('Updating chat')
    await chat.update(ctx.request.body)
    return chat
  }

  static async PostChat(ctx) {
    const user = await this.GetCurrentUser(ctx)
    if (!user) {
      throw new AuthenticationError()
    }
    const title = ctx.request.body.title
    const chat = await ctx.orm.Chat.create({ title: title, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Asadito.jpg/1200px-Asadito.jpg' })
    await ctx.orm.ChatMember.create({ chatId: chat.id, userId: user.id, role: 'owner' })
    return chat
  }

  static async AddChatMember(ctx, chatId) {
    const user = await this.GetCurrentUser(ctx)
    if (!user) {
      throw new AuthenticationError()
    }
    const chat = await this.GetChat(ctx, chatId)
    if (!chat) {
      throw new ItemNotFoundError('Chat')
    }
    const member = await ctx.orm.User.findOne({ where: { phoneNumber: ctx.request.body.phoneNumber } })
    if (!member) {
      throw new ItemNotFoundError('User')
    }
    const chatMember = await ctx.orm.ChatMember.create({ chatId, userId: member.id })
    return chatMember

  }

  static async GetAllContacts(ctx) {
    const contacts = await ctx.orm.Contact.findAll()
    if (!contacts) {
      throw new ItemNotFoundError('Contacts')
    }
    if (!this.IsAdmin(ctx.state.user)) {
      throw new AuthorizationError()
    }
    return contacts
  }

  static async GetContacts(ctx, id) {
    const user = await this.GetCurrentUser(ctx)
    if (!this.IsAdmin(ctx.state.user) && id != user.id) {
      throw new AuthorizationError()
    }
    const contacts = await ctx.orm.Contact.findAll({ where: { userBase: id } })
    if (!contacts) {
      throw new ItemNotFoundError('Contacts')
    }
    // add the phone number by using users table
    for (let i = 0; i < contacts.length; i++) {
      const userContact = await ctx.orm.User.findByPk(contacts[i].userContact)
      contacts[i].userContact = userContact.phoneNumber
    }

    return contacts
  }

  static async GetContact(ctx, id) {
    const contact = await ctx.orm.Contact.findByPk(id)
    if (!contact) {
      throw new ItemNotFoundError('Contact')
    }
    if (contact.userBase != ctx.state.user.id && !this.IsAdmin(ctx.state.user)) {
      throw new AuthorizationError()
    }
    return contact
  }

  static async PostContact(ctx) {
    console.log('Entering PostContact')
    const userBase = await this.GetCurrentUser(ctx)
    if (!userBase) {
      throw new AuthenticationError()
    }
    const userContact = await ctx.orm.User.findOne({ where: { phoneNumber: ctx.request.body.userContact } })
    if (!userContact) {
      throw new ApplicationError('User not found', 404)
    }
    if (userBase.id === userContact.id) {
      throw new ApplicationError('User cannot add themselves as a contact', 400)
    }
    const existingContact = await ctx.orm.Contact.findOne({ where: { userBase: userBase.id, userContact: userContact.id } })
    if (existingContact) {
      console.log('Contact already exists')
      throw new ExistingEntityError('Contact')
    }
    const contact = await ctx.orm.Contact.create({ userBase: userBase.id, userContact: userContact.id, nickname: ctx.request.body.nickname })
    console.log('Contact created')
    return contact
  }

  static async PutContact(ctx, id) {
    const contact = await this.GetContact(ctx, id)
    if (!contact) {
      throw new ItemNotFoundError('Contact')
    }
    if (contact.userBase != ctx.state.user.id && !this.IsAdmin(ctx.state.user)) {
      throw new AuthorizationError()
    }
    await contact.update(ctx.request.body)
    return contact
  }

  static async DelContact(ctx, id) {
    const contact = await this.GetContact(ctx, id)
    if (!contact) {
      throw new ItemNotFoundError('Contact')
    }
    if (contact.userBase != ctx.state.user.id && !this.IsAdmin(ctx.state.user)) {
      throw new AuthorizationError()
    }
    await contact.destroy()
  }

  static async LeaveChat(ctx, user, chatId) {
    const chat = await this.GetChat(ctx, chatId)
    if (!chat) {
      throw new ItemNotFoundError('Chat')
    }
    const chatMember = await ctx.orm.ChatMember.findOne({ where: { chatId, userId: user.id } })
    if (!chatMember) {
      throw new ItemNotFoundError('ChatMember')
    }
    const members = await this.GetChatMembers(ctx, chatId)
    if (members.length == 1) {
      await chat.destroy()
    }
    return await chatMember.destroy()
  }

  static async DelUser(ctx, id) {
    const user = await this.GetUser(ctx, id)
    if (!user) {
      throw new ItemNotFoundError('User')
    }
    const currentUser = await this.GetCurrentUser(ctx)
    if (!currentUser) {
      throw new AuthenticationError()
    }
    if (!this.IsAdmin(ctx.state.user) && user.id != currentUser.id) {
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

  static IsAdmin(JWTuser) {
    return JWTuser.scope == 'admin'
  }

  static async IsChatMember(ctx, user, chatId) {
    return !!await ctx.orm.ChatMember.findOne({ where: { chatId, userId: user.id } })
  }
}
