module.exports = {
  up: async queryInterface => queryInterface.bulkInsert('Chats', [
    {
      title: 'Two of us',
      image: '',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Group chat',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Asadito.jpg/1200px-Asadito.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]),
  down: async queryInterface => queryInterface.bulkDelete('Chats', null, {})
}
