const orderRouter = require('express').Router();
const { User, Drug, Order } = require('../../db/models');
const OrderPage = require('../views/pages/OrderPage');
const renderTemplate = require('../lib/renderTemplate');

// БОЕВОЙ
orderRouter.get('/:id', async (req, res) => {
  const { login, userId } = req.session;
  const { id } = req.params;
  try {
    const orders = await Order.findAll({
      where: { orderUserId: id },
      include: { model: Drug },
    });
    const totalCost = orders.reduce((acc, el) => acc + (el.Drug.drugPrice * el.orderQuantity), 0);
    renderTemplate(OrderPage, { login, orders, totalCost, userId }, res);

  } catch (error) {
    console.log(error);
    res.json({ err: 'Внутренняя ошибка сервера!' });
  }
});

// БОЕВОЙ
orderRouter.post('/:id', async (req, res) => {
  const { login, userId, role } = req.session;
  const { id } = req.params;
  if (userId) {
    try {
      const user = await User.findByPk(userId);
      const drug = await Drug.findByPk(id);
      // console.log(user.id, drug.id);
      // res.end();
      if (user && drug) {
        const order = await Order.findOne({ where: { orderUserId: user.id, orderDrugId: drug.id } });
        if (order) {
          if (drug.drugQuantity > 0) {
              drug.drugQuantity -= 1;
              order.orderQuantity += 1;
              await drug.save();
              await order.save();
            res.json({ msg: 'Добавлено!' });
          } else {
            res.json({ err: 'Товар закончился!' });
          }
        } else if (drug.drugQuantity > 0) {
          await Order.create({
            orderUserId: user.id,
            orderDrugId: drug.id,
            orderQuantity: 1,
          });
          drug.drugQuantity -= 1;
          await drug.save();
          res.json({ msg: 'Добавлено!' });
        } else {
          res.json({ err: 'Товар закончился!' });
        }
      } else {
        res.json({ err: 'Такого пользователя или товара не существует!' });
      }
    } catch (error) {
      console.log(error);
      res.json({ err: 'Внутренняя ошибка сервера!' });
    }
  } else {
    res.json({ err: 'Зарегистрируйтесь, пожалуйста!' });
  }
});

// БОЕВОЙ
orderRouter.put('/:id', async (req, res) => {
  const { login, userId, role } = req.session;
  const { id } = req.params;
  const userOrderQuantity = +req.body.orderQuantity;
  // console.log(id, userOrderQuantity)
  if (userId) {
    try {
      const order = await Order.findOne({
        where: { id },
        include: {
          model: Drug,
          attributes: ['drugQuantity'],
        },
      });
      const drug = await Drug.findByPk(order.orderDrugId);
      if (order) {
        if (typeof userOrderQuantity !== 'number' || userOrderQuantity <= 0) {
          res.json({ err: { orderQuantity: 'Пожалуйста, введите нормальное число!' } });
        } else if (order.Drug.drugQuantity === 0 && userOrderQuantity === order.orderQuantity) {
          res.json({ err: { orderQuantity: 'Вы уже смели все что было!' } });
        } else if (userOrderQuantity < order.orderQuantity) {
          drug.drugQuantity += order.orderQuantity - userOrderQuantity;
          await drug.save();
          order.orderQuantity = userOrderQuantity;
          await order.save();
          res.json({ msg: 'Заказ обновлен!', data: { drugQuantity: drug.drugQuantity } });
        } else if (order.Drug.drugQuantity + order.orderQuantity < userOrderQuantity) {
          res.json({ err: { orderQuantity: 'Вы не можете заказать больше чем есть у поставщика!' } });
        } else {
          drug.drugQuantity = order.Drug.drugQuantity + order.orderQuantity - userOrderQuantity;
          await drug.save();
          order.orderQuantity = userOrderQuantity;
          await order.save();
          res.json({ msg: 'Заказ обновлен!', data: { drugQuantity: drug.drugQuantity } });
        }
      } else {
        res.json({ err: 'Такого заказа не существует.' });
      }
    } catch (error) {
      console.log(error);
      res.json({ err: 'Внутренняя ошибка сервера!' });
    }
  } else {
    res.json({ err: 'Зарегистрируйтесь, пожалуйста!' });
  }
});

// БОЕВОЙ
orderRouter.delete('/:id', async (req, res) => {
  const { login, userId, role } = req.session;
  const { id } = req.params;
  if (userId) {
    try {
      const user = await User.findByPk(userId);
      const order = await Order.findByPk(id);
      const drug = await Drug.findByPk(order.orderDrugId);
      if (user && order && drug) {
        if (user.id === order.orderUserId) {
          // console.log(userOrder.orderItemQuantity);
          // console.log(item.itemQuantity + userOrder.orderItemQuantity);
          drug.drugQuantity += order.orderQuantity;
          await drug.save();
          await order.destroy();
          res.json({ msg: 'Сущность удалена!' });
        } else {
          res.json({ err: 'Вы не владелец этой сущности!' });
        }
      } else {
        res.json({ err: 'Такого пользователя или сущности не существует!' });
      }
    } catch (error) {
      console.log(error);
      res.json({ err: 'Внутренняя ошибка сервера!' });
    }
  } else {
    res.json({ err: 'У вас нет прав на удаление этого заказа!' });
  }
});

module.exports = orderRouter;
