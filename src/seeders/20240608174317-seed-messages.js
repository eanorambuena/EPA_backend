module.exports = {
  up: async queryInterface => queryInterface.bulkInsert('Messages', [
    {
      content: 'Hi, how are you?',
      chatId: 1,
      userId: 1,
      state: 'sent',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content: 'I am fine, thank you',
      chatId: 1,
      userId: 2,
      state: 'sent',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content: 'What are you doing?',
      chatId: 1,
      userId: 1,
      state: 'sent',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content: 'I am working',
      chatId: 1,
      userId: 2,
      state: 'sent',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content: 'Hi, how are you?',
      chatId: 2,
      userId: 1,
      state: 'sent',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content: 'I am fine, thank you',
      chatId: 2,
      userId: 2,
      state: 'sent',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content: 'What are you doing?',
      chatId: 2,
      userId: 1,
      state: 'sent',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content: 'I am working',
      chatId: 2,
      userId: 2,
      state: 'sent',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content: 'What are you talking without me?',
      chatId: 2,
      userId: 3,
      state: 'sent',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      content: 'Read the previous messages',
      chatId: 2,
      userId: 1,
      state: 'sent',
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]),
  down: async queryInterface => queryInterface.bulkDelete('Messages', null, {})
}
