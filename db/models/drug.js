'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Drug extends Model {
    static associate(models) {
      this.hasMany(models.Order, { foreignKey: 'orderDrugId' });
    }
  }
  Drug.init(
    {
      drugTitle: DataTypes.STRING,
      drugDescription: DataTypes.TEXT,
      drugQuantity: DataTypes.INTEGER,
      drugPrice: DataTypes.INTEGER,
      drugDiscount: DataTypes.INTEGER,
      drugImageLink: DataTypes.TEXT,
      drugRating: DataTypes.INTEGER,
      drugIsFree: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Drug',
    },
  );
  return Drug;
};
