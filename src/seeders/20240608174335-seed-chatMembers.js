module.exports = {
  up: async queryInterface => queryInterface.bulkInsert('ChatMembers', [
    {
      chatId: 1,
      userId: 1,
      role: 'owner',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      chatId: 1,
      userId: 2,
      role: 'member',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      chatId: 2,
      userId: 1,
      role: 'member',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      chatId: 2,
      userId: 2,
      role: 'owner',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      chatId: 2,
      userId: 3,
      role: 'member',
      createdAt: new Date(),
      updatedAt: new Date()
    }

  ]),
  down: async queryInterface => queryInterface.bulkDelete('ChatMembers', null, {})
}
