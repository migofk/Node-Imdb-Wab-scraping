'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('users', [
      {
      firstName: 'John',
      lastName: 'Doe',
      email: 'example@example.com',
      password:123456,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Ahmed',
      lastName: 'Doe',
      email: 'example1@example.com',
      password:123456,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('users', null, {});
  }
};
