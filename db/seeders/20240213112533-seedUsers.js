'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        login: 'admin',
        email: 'admin@123',
        password: await bcrypt.hash('123', 10),
        userName: 'Админ Админович Админов',
        userPhone: '+79171848851',
        userImageLink: '',
        userBirthDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null);
  },
};
