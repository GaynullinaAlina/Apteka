'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Week extends Model {
    static associate(models) {
      // define association here
    }
  }
  Week.init({
    drugIdOne: DataTypes.INTEGER,
    drugIdTwo: DataTypes.INTEGER,
    drugIdThree: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Week',
  });
  return Week;
};