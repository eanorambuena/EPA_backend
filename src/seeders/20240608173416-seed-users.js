module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      phoneNumber: '56912345678',
      password: 'safePassword',
      type: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      phoneNumber: '56987654321',
      password: 'safePassword',
      type: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      phoneNumber: '56944445678',
      password: 'safePassword',
      type: 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

  ]),
  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
