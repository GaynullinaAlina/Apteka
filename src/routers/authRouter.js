const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const mailer = require("../../mailer");
const renderTemplate = require("../lib/renderTemplate");
const { User, Drug } = require("../../db/models");

const RegisterPage = require("../views/pages/RegisterPage");
const LoginPage = require("../views/pages/LoginPage");
const getRandomIdsAndChangeIsFree = require("../../api/calendar");

// ВСЕ РОУТЕРЫ БОЕВЫЕ

authRouter.get("/register", async (req, res) => {
  try {
    renderTemplate(RegisterPage, { title: "Регистрация" }, res);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

authRouter.get("/login", async (req, res) => {
  try {
    renderTemplate(LoginPage, { title: "Войти" }, res);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

authRouter.post("/register", async (req, res) => {
  const {
    login,
    email,
    password,
    userName,
    userPhone,
    userImageLink,
    userBirthDate,
  } = req.body;
  if (!login) {
    res.json({ err: { login: "Пожалуйста, придумайте логин." } });
  } else if (/[^a-zA-Zа-яА-Я0-9]/.test(login)) {
    res.json({
      err: {
        login:
          "В логине присутствуют запрещенные символы. Пожалуйста, не ломайте базу.",
      },
    });
  } else if (!email) {
    res.json({ err: { email: "Пожалуйста, введите ваш email." } });
  } else if (!password) {
    res.json({ err: { password: "Пожалуйста, придумайте пароль." } });
  } else if (!userName) {
    res.json({ err: { userName: "Пожалуйста, напишите свое имя." } });
  } else if (!userPhone) {
    res.json({
      err: { userPhone: "Пожалуйста, напишите свой номер телефона." },
    });
  } else if (!userImageLink) {
    res.json({
      err: { userImageLink: "Пожалуйста, отправьте ссылку на ваше фото." },
    });
  } else if (!userBirthDate) {
    res.json({
      err: { userBirthDate: "Пожалуйста, укажите дату вашего рождения." },
    });
  } else {
    try {
      if (await User.findOne({ where: { login } })) {
        res.json({
          err: { login: "Пользователь с таким логином уже зарегистрирован." },
        });
      } else if (await User.findOne({ where: { email } })) {
        res.json({
          err: { email: "Пользователь с такой почтой уже зарегистрирован." },
        });
      } else {
        const message = {
          to: email,
          subject:
            "Congratulations! You are successfully registred on our site",
          html: `
          <h2>${userName},Поздравляем! Вы успешно зарегистрировались на нашем сайте!</h2>
          
          <i>данные вашей учетной записи:</i>
          <ul>
              <li>login: ${email}</li>
              <li>password: ${password}</li>
              </ul>
              <a href="http://localhost:3000/home">Социальная Аптека 30</a><br />
              <p>Данное письмо не требует ответа.<p>`,
        };
        mailer(message);
        const hash = await bcrypt.hash(password, 10);
        const newUser = await User.create({
          login,
          email,
          password: hash,
          userName,
          userPhone,
          userImageLink,
          userBirthDate,
        });
        req.session.login = newUser.login;
        req.session.userName = newUser.userName;
        req.session.userId = newUser.id;
        req.session.userImageLink = newUser.userImageLink;
        req.session.save();
        console.log(login, email, hash);
        res.json({ msg: "Успешно!" });
      }
    } catch (error) {
      console.log(error);
      res.json({ err: "Внутренняя ошибка сервера." });
    }
  }
});

authRouter.post("/login", async (req, res) => {
  const { login, password } = req.body;
  if (!login) {
    res.json({ err: { login: "Пожалуйста, введите логин." } });
  } else if (!password) {
    res.json({ err: { login: "Пожалуйста, введите пароль." } });
  } else {
    try {
      let user = await User.findOne({ where: { login } });
      if (!user) user = await User.findOne({ where: { email: login } });
      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          req.session.login = user.login;
          req.session.userImageLink = user.userImageLink;
          req.session.userName = user.userName;
          req.session.userId = user.id;
          req.session.save();
          res.json({ msg: "Успешно!" });
        } else {
          res.json({ err: { password: "Неверный пароль." } });
        }
      } else {
        res.json({
          err: {
            login: "Пользователя с таким логином или почтой не существует.",
          },
        });
      }
    } catch (error) {
      console.log(error);
      res.json({ err: "Внутренняя ошибка сервера." });
    }
  }
});

module.exports = authRouter;
