console.log('скрипт на календарь подключен');

const cal = document.querySelector('.calendar-wrapper input');

cal.addEventListener('input', async (event) => {
  try {
    const response = await fetch(`/calendar/titles/${+event.target.value.slice(6)}`, {
      method: 'GET',
    });
    if (response.status === 200) {
      const data = await response.json();
      let div = document.querySelector('.week-info');
      const html = `
      <span>На неделе ${+event.target.value.slice(6)} бесплатными</span>
      <span>будут следующие лекарства:</span>
      <span class="free-drug-span">${data.drugTitleOne}</span>
      <span class="free-drug-span">${data.drugTitleTwo}</span>
      <span class="free-drug-span">${data.drugTitleThree}</span>
      `;
      if (div) {
        div.innerHTML = html;
      } else {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = html;
        newDiv.className = 'week-info';
        event.target.insertAdjacentElement('afterend', newDiv);
      }
    }
  } catch (error) {
    console.log(error);
  }
});
