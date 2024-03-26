const indexRouter = require('express').Router();
const renderTemplate = require('../lib/renderTemplate');
const HomePage = require('../views/pages/HomePage');
// const UserPage = require('../views/pages/UserPage');
const Basket = require('../views/pages/Basket');

// const { User, Item, UserOrder } = require('../../db/models');
const { Order, Drug, User } = require('../../db/models');

// БОЕВОЙ
// indexRouter.get('/', async (req, res) => {
//   const { login, userId, role } = req.session;
//   try {
//     const items = await Item.findAll({
//       include: {
//         model: User,
//         attributes: ['login'],
//       },
//       order: [['id', 'DESC']],
//     });
//     renderTemplate(
//       HomePage,
//       {
//         login,
//         userId,
//         role,
//         title: 'Главная страница',
//         items,
//       },
//       res,
//     );
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// });

indexRouter.get('/', async (req, res) => {
  const { login, userId } = req.session;
  try {
    const drugIsFree = await Drug.findAll({ where: { drugIsFree: true } })
    const drugs = await Drug.findAll();
    renderTemplate(HomePage, { login, drugs, drugIsFree, userId }, res);
  } catch (error) {
    console.log(error);
    res.json({ err: 'Внутренняя ошибка сервера!' });
  }
});

indexRouter.get('/drugs', async (req, res) => {
  const { login, userId } = req.session;
  try {
    const drugIsFree = await Drug.findAll({ where: { drugIsFree: true } })
    const drugs = await Drug.findAll();
    res.json({ drugs });
  } catch (error) {
    console.log(error);
    res.json({ err: 'Внутренняя ошибка сервера!' });
  }
});

// БОЕВОЙ
indexRouter.get('/user/:userLogin', async (req, res) => {
  const { login, userId, role } = req.session;
  const { userLogin } = req.params;
  if (userId) {
    try {
      const user = await User.findOne({ where: { login: userLogin } });
      const userOrders = await UserOrder.findAll({
        where: { orderUserId: user.id },
        include: [
          { model: Item },
          {
            model: User,
            attributes: ['login'],
          },
        ],
      });
      // const userOrders = userOrdersRaw.map((el) => ({
      //   itemArt: el.Item.itemArt,
      //   itemTitle: el.Item.itemTitle,
      //   itemDescription: el.Item.itemDescription,
      //   itemPhotoLink: el.Item.itemPhotoLink,
      //   itemPrice: el.Item.itemPrice,
      //   itemQuantity: el.Item.itemQuantity,
      //   createdAt: el.Item.createdAt,
      //   User: el.User,
      // }));
      if (user) {
        try {
          renderTemplate(
            UserPage,
            {
              login,
              userId,
              role,
              title: `${role === 'seller' ? 'Товары' : 'Заказы'} пользователя ${login}`,
              userOrders,
            },
            res,
          );
        } catch (error) {
          console.log(error);
          res.json({ err: 'Ошибка при отрисовке страницы!' });
        }
      } else {
        res.redirect('/');
      }
    } catch (error) {
      console.log(error);
      res.json({ err: 'Внутренняя ошибка сервера!' });
    }
  } else {
    res.redirect('/');
  }
});

indexRouter.get('/myCart', async (req, res) => {
  try {
    const { login, userId } = req.session;
    const drugs = await Order.findAll({
      where: { orderUserId: userId },
      include: { model: Drug },
    });
    renderTemplate(Basket, { login, drugs }, res);
  } catch (error) {
    console.log(error);
    res.json({ err: 'Внутренняя ошибка сервера!' });
  }
});

// БОЕВОЙ
indexRouter.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('brbl');
    res.redirect('/');
  });
});

module.exports = indexRouter;
