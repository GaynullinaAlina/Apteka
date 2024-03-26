const basketRouter = require('express').Router();
const { Order, Drug } = require('../../db/models');

basketRouter.post('/', async (req, res) => {
  const { login, userId } = req.session;
  const { orderId } = req.body;
  try {
    const drug = await Drug.findByPk(orderId);
    if (!drug || drug.drugQuantity <= 0) {
      return res.send('Товара нет в наличии!');
    }
    let order = await Order.findOne({ where: { orderDrugId: orderId, orderUserId: userId } });
    if (order) {
      order.orderQuantity += 1;
    } else {
      order = await Order.create({ orderDrugId: orderId, orderUserId: userId, orderQuantity: 1 });
    }
    const newQuantity = drug.drugQuantity - order.orderQuantity;
    await drug.update({ drugQuantity: newQuantity });
    res.redirect('/');
  } catch (error) {
    console.log(error);
    res.json({ err: 'Ошибка при добавлении товара в корзину!' });
  }
});

module.exports = basketRouter;
