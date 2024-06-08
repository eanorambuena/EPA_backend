module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      phoneNumber: 56912345678,
      password: 'safePassword',
      type: 'admin',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

  ]),
  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
