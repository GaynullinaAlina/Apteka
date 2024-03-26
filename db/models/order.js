'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'orderUserId' });
      this.belongsTo(models.Drug, { foreignKey: 'orderDrugId' });
    }
  }
  Order.init(
    {
      orderUserId: DataTypes.INTEGER,
      orderDrugId: DataTypes.INTEGER,
      orderQuantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
  return Order;
};
