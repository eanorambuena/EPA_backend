const bcrypt = require('bcrypt')

module.exports = {
  up: async queryInterface => queryInterface.bulkInsert('Users', [
    {
      phoneNumber: '56912345678',
      password: await bcrypt.hash('safePassword', 10),
      type: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      phoneNumber: '56987654321',
      password: await bcrypt.hash('safePassword6', 10),
      type: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      phoneNumber: '56944445678',
      password: await bcrypt.hash('safePassword3', 10),
      type: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }

  ]),
  down: async queryInterface => queryInterface.bulkDelete('Users', null, {})
}
