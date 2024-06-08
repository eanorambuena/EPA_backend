module.exports = {
  up: async (queryInterface) => queryInterface.bulkInsert('Profiles', [
    {
      username: 'Alex',
      email: 'alex@gmail.com',
      status: 'Hello, I am Alex',
      description: 'I am a software engineer',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'John',
      email: 'johndoe@yahoo.com',
      status: 'Hello, I am John',
      description: 'I am an old man',
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'Jane',
      email: 'janemail@hotmail.com',
      status: 'Hello, I am Jane',
      description: 'I am a young lady',
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },

  ]),
  down: async (queryInterface) => queryInterface.bulkDelete('Profiles', null, {}),
};
