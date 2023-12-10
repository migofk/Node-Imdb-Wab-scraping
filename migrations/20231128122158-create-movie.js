'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT
      },
      poster: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      runtime: {
        type: Sequelize.INTEGER
      },
      vote: {
        type: Sequelize.INTEGER
      },
      genre: {
        type: Sequelize.STRING
      },
      rate: {
        type: Sequelize.FLOAT
      },
      gross: {
        type: Sequelize.STRING
      },
      certificate: {
        type: Sequelize.STRING
      },
      cast: {
        type: Sequelize.JSON
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Movies');
  }
};