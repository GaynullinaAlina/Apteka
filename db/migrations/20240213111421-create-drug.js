'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Drugs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      drugTitle: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      drugDescription: {
        type: Sequelize.TEXT,
      },
      drugQuantity: {
        type: Sequelize.INTEGER,
      },
      drugPrice: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      drugDiscount: {
        type: Sequelize.INTEGER,
      },
      drugImageLink: {
        type: Sequelize.TEXT,
      },
      drugRating: {
        type: Sequelize.INTEGER,
      },
      drugIsFree: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Drugs');
  },
};
