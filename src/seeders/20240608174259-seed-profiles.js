module.exports = {
  up: async queryInterface => queryInterface.bulkInsert('Profiles', [
    {
      username: 'Alex',
      email: 'alex@gmail.com',
      status: 'Hello, I am Alex',
      description: 'I am a software engineer',
      image: 'https://i.pravatar.cc/150?img=60',
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'John',
      email: 'johndoe@yahoo.com',
      status: 'Hello, I am John',
      description: 'I am an old man',
      image: 'https://i.pravatar.cc/150?img=68',
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Jane',
      email: 'janemail@hotmail.com',
      status: 'Hello, I am Jane',
      description: 'I am a young lady',
      image: 'https://i.pravatar.cc/150?img=58',
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    }

  ]),
  down: async queryInterface => queryInterface.bulkDelete('Profiles', null, {})
}
