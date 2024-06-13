module.exports = {
  up: async queryInterface => queryInterface.bulkInsert('Chats', [
    {
      title: 'Two of us',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Group chat',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]),
  down: async queryInterface => queryInterface.bulkDelete('Chats', null, {})
}
