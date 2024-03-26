const itemRouter = require('express').Router();
const renderTemplate = require('../lib/renderTemplate');
const NewItemPage = require('../views/pages/NewItemPage');
const EditItemPage = require('../views/pages/EditItemPage');
const { User, UserOrder, Item } = require('../../db/models');

// БОЕВОЙ
itemRouter.get('/new', async (req, res) => {
  const { login, userId, role } = req.session;
  if (login && userId) {
    if (role === 'seller') {
      try {
        renderTemplate(
          NewItemPage,
          {
            title: 'Добавление нового товара',
            userId,
            login,
            role,
          },
          res,
        );
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    } else {
      res.redirect('/');
    }
  } else {
    res.redirect('/auth/register');
  }
});

// БОЕВОЙ
itemRouter.post('/new', async (req, res) => {
  const { userId, role } = req.session;
  const { itemArt, itemTitle, itemDescription, itemPhotoLink, itemPrice, itemQuantity } = req.body;
  if (userId && role === 'seller') {
    if (!itemArt) {
      res.json({ err: { itemArt: 'Товар не может быть без артикула!' } });
    } else if (!itemTitle) {
      res.json({ err: { itemTitle: 'Товар не может быть без заголовка!' } });
    } else if (!itemDescription) {
      res.json({ err: { itemDescription: 'Товар не может быть без описания!' } });
    } else if (!itemPrice) {
      res.json({ err: { itemPrice: 'Конечно ваши товары бесценны, но введите хоть что-нибудь!' } });
    } else if (typeof itemPrice !== 'number' && itemPrice <= 0) {
      res.json({ err: { itemPrice: 'Цена на товар должна быть нормальным числом!' } });
    } else if (!itemQuantity) {
      res.json({ err: { itemQuantity: 'Конечно ваши товары неисчисляемы, но введите хоть сколько-нибудь!' } });
    } else if (typeof itemQuantity !== 'number' && itemQuantity <= 0) {
      res.json({ err: { itemQuantity: 'Количество товаров должно быть нормальным числом!' } });
    } else {
      try {
        const user = await User.findByPk(userId);
        if (user) {
          try {
            if (await Item.findOne({ where: { itemArt } })) {
              res.json({ err: { itemArt: 'Артикул товара должен быть уникальным!' } });
            } else {
              await Item.create({
                itemUserId: userId,
                itemArt,
                itemTitle,
                itemDescription,
                itemPhotoLink,
                itemPrice,
                itemQuantity,
              });
              res.json({ msg: 'Успешно!' });
            }
          } catch (error) {
            console.log(error);
            res.json({ err: 'Ошибка при добавлении товара!' });
          }
        } else {
          res.json({ err: 'Такого пользователя не существует!' });
        }
      } catch (error) {
        console.log(error);
        res.json({ err: 'Внутренняя ошибка сервера!' });
      }
    }
  } else {
    res.json({ err: 'У вас нет прав на добавление товара!' });
  }
});

// БОЕВОЙ
itemRouter.get('/edit/:id', async (req, res) => {
  const { login, userId, role } = req.session;
  const { id } = req.params;
  if (login && userId && role === 'seller') {
    if (typeof +id === 'number') {
      try {
        const item = await Item.findByPk(id);
        if (item && item.itemUserId === userId) {
          renderTemplate(
            EditItemPage,
            {
              title: 'Редактирование товара',
              login,
              userId,
              role,
              item,
            },
            res,
          );
        } else {
          res.redirect('/');
        }
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
    } else {
      res.redirect('/');
    }
  } else {
    res.redirect('/auth/register');
  }
});

// itemArt
// itemTitle
// itemDescription
// itemPhotoLink
// itemPrice
// itemQuantity

// БОЕВОЙ
itemRouter.put('/:id', async (req, res) => {
  const { login, userId, role } = req.session;
  const { id } = req.params;
  const { itemArt, itemTitle, itemDescription, itemPhotoLink, itemPrice, itemQuantity } = req.body;
  if (userId && role === 'seller') {
    if (!itemArt) {
      res.json({ err: { itemArt: 'Товар не может быть без артикула!' } });
    } else if (!itemTitle) {
      res.json({ err: { itemTitle: 'Товар не может быть без заголовка!' } });
    } else if (!itemDescription) {
      res.json({ err: { itemDescription: 'Товар не может быть без описания!' } });
    } else if (!itemPrice) {
      res.json({ err: { itemPrice: 'Конечно ваши товары бесценны, но введите хоть что-нибудь!' } });
    } else if (typeof itemPrice !== 'number' && itemPrice <= 0) {
      res.json({ err: { itemPrice: 'Цена на товар должна быть нормальным числом!' } });
    } else if (!itemQuantity) {
      res.json({ err: { itemQuantity: 'Конечно ваши товары неисчисляемы, но введите хоть сколько-нибудь!' } });
    } else if (typeof itemQuantity !== 'number' && itemQuantity <= 0) {
      res.json({ err: { itemQuantity: 'Количество товаров должно быть нормальным числом!' } });
    } else {
      try {
        const item = await Item.findByPk(id);
        if (item) {
          if (item.itemArt !== itemArt && (await Item.findOne({ where: { itemArt } }))) {
            res.json({ err: { itemArt: 'Артикул товара должен быть уникальным!' } });
          } else {
            item.itemArt = itemArt;
            item.itemTitle = itemTitle;
            item.itemDescription = itemDescription;
            item.itemPhotoLink = itemPhotoLink;
            item.itemPrice = itemPrice;
            item.itemQuantity = itemQuantity;
            await item.save();
            res.json({ msg: 'Товар обновлен!' });
          }
        } else {
          res.json({ err: 'Такого товара не существует.' });
        }
      } catch (error) {
        console.log(error);
        res.json({ err: 'Внутренняя ошибка сервера!' });
      }
    }
  } else {
    res.json({ err: 'У вас нет прав на редактирование этого товара!' });
  }
});

// itemRouter.get('/:id', async (req, res) => {
//   const { login, userId } = req.session;
//   const { id } = req.params;
//   try {
//     try {
//       const card = await Card.findOne({
//         where: { id },
//         include: {
//           model: User,
//           attributes: ['login'],
//         },
//       });
//       if (card) {
//         renderTemplate(
//           CardPage,
//           {
//             login,
//             userId,
//             title: card.cardTitle,
//             card,
//           },
//           res,
//         );
//       } else {
//         res.redirect('/');
//       }
//     } catch (error) {
//       console.log(error);
//       res.json({ err: 'Ошибка при поиске сущности!' });
//     }
//   } catch (error) {
//     console.log(error);
//     res.json({ err: 'Внутренняя ошибка сервера!' });
//   }
// });

// БОЕВОЙ
itemRouter.delete('/:id', async (req, res) => {
  const { login, userId, role } = req.session;
  const { id } = req.params;
  if (userId && role === 'seller') {
    try {
      const user = await User.findByPk(userId);
      const item = await Item.findByPk(id);
      if (user && item) {
        if (user.id === item.itemUserId) {
          const userOrders = await UserOrder.findAll({ where: { orderItemId: item.id } });
          if (userOrders) {
            userOrders.forEach(async (el) => {
              await el.destroy();
            });
          }
          await item.destroy();
          res.json({ msg: 'Товар удален!' });
        } else {
          res.json({ err: 'Вы не владелец этого товара!' });
        }
      } else {
        res.json({ err: 'Такого пользователя или товара не существует!' });
      }
    } catch (error) {
      console.log(error);
      res.json({ err: 'Внутренняя ошибка сервера!' });
    }
  } else {
    res.json({ err: 'У вас нет прав на удаление этого товара!' });
  }
});

module.exports = itemRouter;
