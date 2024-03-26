const indexRouter = require('express').Router();
const renderTemplate = require('../lib/renderTemplate');
const TESTPAGE = require('../views/pages/TESTPAGE');
// const UserPage = require('../views/pages/UserPage');
const { User, Drug, UserOrder } = require('../../db/models');

// РАБОТАЕМ
indexRouter.get('/', async (req, res) => {
  const { login, userId, userName } = req.session;
  try {
    const drugs = await Drug.findAll({
      order: [['id', 'DESC']],
    });
    renderTemplate(TESTPAGE, { login, userId, drugs }, res);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// itemArt
// itemTitle
// itemDescription
// itemPhotoLink
// itemPrice
// itemQuantity

// БОЕВОЙ
// indexRouter.get('/user/:userLogin', async (req, res) => {
//   const { login, userId, role } = req.session;
//   const { userLogin } = req.params;
//   if (userId) {
//     try {
//       const user = await User.findOne({ where: { login: userLogin } });
//       const userOrders = await UserOrder.findAll({
//         where: { orderUserId: user.id },
//         include: [
//           { model: Item },
//           {
//             model: User,
//             attributes: ['login'],
//           },
//         ],
//       });
//       // const userOrders = userOrdersRaw.map((el) => ({
//       //   itemArt: el.Item.itemArt,
//       //   itemTitle: el.Item.itemTitle,
//       //   itemDescription: el.Item.itemDescription,
//       //   itemPhotoLink: el.Item.itemPhotoLink,
//       //   itemPrice: el.Item.itemPrice,
//       //   itemQuantity: el.Item.itemQuantity,
//       //   createdAt: el.Item.createdAt,
//       //   User: el.User,
//       // }));
//       if (user) {
//         try {
//           renderTemplate(
//             UserPage,
//             {
//               login,
//               userId,
//               role,
//               title: `${role === 'seller' ? 'Товары' : 'Заказы'} пользователя ${login}`,
//               userOrders,
//             },
//             res,
//           );
//         } catch (error) {
//           console.log(error);
//           res.json({ err: 'Ошибка при отрисовке страницы!' });
//         }
//       } else {
//         res.redirect('/');
//       }
//     } catch (error) {
//       console.log(error);
//       res.json({ err: 'Внутренняя ошибка сервера!' });
//     }
//   } else {
//     res.redirect('/');
//   }
// });

// БОЕВОЙ
indexRouter.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('brbl');
    res.redirect('/');
  });
});

module.exports = indexRouter;
