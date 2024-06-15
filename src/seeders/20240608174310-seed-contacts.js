module.exports = {
  up: async queryInterface => queryInterface.bulkInsert('Contacts', [
    {
      nickname: 'Johnny',
      userBase: 1,
      userContact: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nickname: 'Hubby',
      userBase: 3,
      userContact: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nickname: 'Gold digger',
      userBase: 2,
      userContact: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nickname: 'Boss',
      userBase: 3,
      userContact: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nickname: 'Son',
      userBase: 2,
      userContact: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }

  ]),
  down: async queryInterface => queryInterface.bulkDelete('Contacts', null, {})
}
