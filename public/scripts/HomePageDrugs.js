const container = document.querySelector('.drugs-container');
const input = document.querySelector('.drugs-search');
const sortASCButton = document.querySelector('.sort-button-asc');
const sortDESCButton = document.querySelector('.sort-button-desc');

function renderDrugs(drugs, container) {
  const drugsHtml = drugs
    .filter((drug) => drug.drugQuantity !== 0)
    .map((drug) => {
      return `
      <div class="drug-card">
        <div class="drug-card-img-wrapper">
          <img src="${drug.drugImageLink}" alt="${drug.drugTitle}" />
          <div class="drug-card-discount">-${drug.drugIsFree ? '100' : drug.drugDiscount}%</div>
        </div>
        <div class="drug-card-price">
          ${
            drug.drugDiscount || drug.drugIsFree
              ? `<div class="drug-card-price-discount">
          <span class="drug-card-price-discount-span">${Math.floor(drug.drugPrice * (drug.drugIsFree ? 0 : (100 - drug.drugDiscount) / 100))} Рубь!</span>
          <span class="drug-card-price-footer">Новая цена</span>
        </div>`
              : ''
          }
          <div class="drug-card-price-old">
            <span>${drug.drugPrice} рубь</span>
            <span class="drug-card-price-footer">Старая цена</span>
          </div>
        </div>
        <div class="drug-card-title">${drug.drugTitle}</div>
        <span class="drug-quantity-span">На складе: <span class="drug-quantity">${drug.drugQuantity}</span> шт.</span>
        <button class="drug-order-button" data-id="${drug.id}">В авоську!</button>
      </div>
    `;
    })
    .join('');

  // <div class="card" style="width: 15rem">
  //   <img src="${drug.drugImageLink}" alt="cardLogo" />
  //   <div class="card-body">
  //     <h4 class="card-title">${drug.drugTitle}</h4>
  //     ${`<p>Цена: ${drug.drugPrice} ₽</p>
  //         <p>Скидка: ${drug.drugIsFree ? 100 : drug.drugDiscount} %</p>
  //         <p>Цена со скидкой: ${Math.floor(drug.drugPrice * (drug.drugIsFree ? 0 : (100 - drug.drugDiscount) / 100))} ₽</p>`}
  //     <p class="card-text">Описание: ${drug.drugDescription}</p>
  //     <p class="card-text">На складе: <span class="drug-quantity">${drug.drugQuantity}</span> шт.</p>
  //     <button type="button" class="drug-order-button btn btn-primary" data-id="${drug.id}">
  //       В корзину
  //     </button>
  //   </div>
  // </div>
  container.innerHTML = drugsHtml;
}

let drugs = [];

document.addEventListener('DOMContentLoaded', async (event) => {
  try {
    const response = await fetch('/drugs', {
      method: 'GET',
    });
    if (response.status === 200) {
      drugs = (await response.json()).drugs;
      input.addEventListener('input', (event) => {
        const filteredDrugs = drugs.filter((el) => el.drugTitle.toLowerCase().includes(input.value.toLowerCase()));
        renderDrugs(filteredDrugs, container);
      });
      renderDrugs(drugs, container);
    }
  } catch (error) {
    console.log(error);
  }
});

document.body.addEventListener('click', async (event) => {
  if (event.target.classList.contains('drug-order-button')) {
    const itemQuantitySpan = event.target.closest('.drug-card').querySelector('.drug-quantity');
    const { id } = event.target.dataset;
    try {
      const response = await fetch(`/orders/${id}`, {
        method: 'POST',
      });
      if (response.status === 200) {
        const { err, msg } = await response.json();
        if (msg) {
          event.target.innerText = msg;
          itemQuantitySpan.innerText = +itemQuantitySpan.innerText - 1;
          drugs.find((el) => el.id === Number(id)).drugQuantity -= 1;
        }
        if (err) {
          event.target.innerText = err;
          event.target.disabled = true;
          if (err === 'Товар закончился!') {
            setTimeout(() => {
              event.target.closest('.drug-card').remove();
            }, 1000);
          }
        }
      } else {
        console.log('Все упало...');
      }
    } catch (error) {
      console.log(error);
    }
  }
});



sortASCButton.addEventListener('click', (event) => {
  drugs.sort((a, b) => Math.floor(b.drugPrice * (b.drugIsFree ? 0 : (100 - b.drugDiscount) / 100)) - Math.floor(a.drugPrice * (a.drugIsFree ? 0 : (100 - a.drugDiscount) / 100)));
  renderDrugs(drugs, container);
});

sortDESCButton.addEventListener('click', (event) => {
  drugs.sort((a, b) => Math.floor(a.drugPrice * (a.drugIsFree ? 0 : (100 - a.drugDiscount) / 100)) - Math.floor(b.drugPrice * (b.drugIsFree ? 0 : (100 - b.drugDiscount) / 100)));
  renderDrugs(drugs, container);
});
