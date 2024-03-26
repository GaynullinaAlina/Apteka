const { Drug } = require('../db/models');

async function getRandomIdsAndChangeIsFree() {
  const randomIds = [];
  while (randomIds.length < 3) {
    const id = Math.floor(Math.random() * 31) + 1;
    if (!randomIds.includes(id)) {
      randomIds.push(id);
    }
  }
  console.log('Случайные id:', randomIds);
  const drugs = await Drug.findAll({ where: { id: randomIds } });
  for (const drug of drugs) {
    await drug.update({ drugIsFree: true });
  }
}
console.log('Записи успешно обновлены');
setInterval(async () => {
  const drugsData = await Drug.findAll({ where: { drugIsFree: true } });
  for (const drugData of drugsData) {
    await drugData.update({ drugIsFree: false });
  }
  await getRandomIdsAndChangeIsFree();
  console.log('прошла минута');
}, 180000);


