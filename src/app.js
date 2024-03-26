require('@babel/register');
require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { Week, Drug } = require('../db/models');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();
const { PORT } = process.env;
const sessionConfig = {
  name: 'brbl',
  store: new FileStore(),
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    httpOnly: true,
  },
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(session(sessionConfig));

const calendarRouter = require('./routers/calendarRouter');
const authRouter = require('./routers/authRouter');
const indexRouter = require('./routers/indexRouter');
// const drugRouter = require('./routers/drugRouter');
const userRouter = require('./routers/userRouter');
const orderRouter = require('./routers/orderRouter');

// const { secureRoute } = require('./middlewares/common');
function secureRoute(req, res, next) {
  if (!req.session.login) {
    next();
  } else {
    res.redirect('/');
  }
}

app.use('/auth', secureRoute, authRouter);
app.use('/calendar', calendarRouter);
app.use('/orders', orderRouter);
// app.use('/', drugRouter)
app.use('/user', userRouter);
app.use('/', indexRouter);

// app.use('/item', itemRouter);
// app.use('/order', orderRouter);

app.listen(PORT, () => console.log(`Сервер запущен: http://localhost:${PORT}`));

Date.prototype.getWeek = function () {
  const date = new Date(this.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
};

async function updateFreeDrugs(week) {
  const freeDrugs = await Drug.findAll({ where: { drugIsFree: true } });
  for (const drug of freeDrugs) {
    await drug.update({ drugIsFree: false });
  }
  const { drugIdOne, drugIdTwo, drugIdThree } = await Week.findByPk(week);
  const newFreeDrugs = await Drug.findAll({ where: { id: [drugIdOne, drugIdTwo, drugIdThree] } });
  for (const drug of newFreeDrugs) {
    await drug.update({ drugIsFree: true });
  }
}

updateFreeDrugs(new Date().getWeek());
