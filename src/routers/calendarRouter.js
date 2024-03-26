const calendarRouter = require('express').Router();
const { Order, Drug, Week } = require('../../db/models');

calendarRouter.get('/titles/:id', async (req, res) => {
    const { login, userId } = req.session;
    const { id } = req.params;
    try {
      const week = await Week.findByPk(id);
      const freeDrugs = await Drug.findAll({ where: { id: [week.drugIdOne, week.drugIdTwo, week.drugIdThree] } })
      res.json({ drugTitleOne: freeDrugs[0].drugTitle, drugTitleTwo: freeDrugs[1].drugTitle, drugTitleThree: freeDrugs[2].drugTitle });
    } catch (error) {
      console.log(error);
      res.json({ err: 'Ошибка при поиске недели!' });
    }
  });

calendarRouter.get('/:id', async (req, res) => {
  const { login, userId } = req.session;
  const { id } = req.params;
  try {
    const week = await Week.findByPk(id);
    res.json({ drugIdOne: week.drugIdOne, drugIdTwo: week.drugIdTwo, drugIdThree: week.drugIdThree });
  } catch (error) {
    console.log(error);
    res.json({ err: 'Ошибка при поиске недели!' });
  }
});

module.exports = calendarRouter;
