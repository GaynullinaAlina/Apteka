'use strict';

const { Drug } = require('../models');

function getRandomDrugIds(length) {
  const ids = [];
  while (ids.length < 3) {
    const rndId = Math.floor(Math.random() * length) + 1;
    if (!ids.includes(rndId)) {
      ids.push(rndId);
    }
  }
  return ids
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const drugLength = (await Drug.findAll()).length
    await queryInterface.bulkInsert('Weeks', new Array(52).fill(null).map(() => {
      const ids = getRandomDrugIds(drugLength);
      return ({
        drugIdOne: ids[0],
        drugIdTwo: ids[1],
        drugIdThree: ids[2],
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }));
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Weeks', null);
  },
};
