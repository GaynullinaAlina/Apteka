/* eslint-disable no-param-reassign */
console.log('скрипт на обновление заказа подключен');

const updateContent = document.querySelector('.card-wrapper');
const inputs = document.querySelectorAll('input[name="userOrderQuantity"]');

function updateSum() {
  const finalSum = document.querySelector('.final-sum');
  let sum = 0;
  inputs.forEach((el) => {
    const order = el.closest('.drugOrder');
    sum += +order.querySelector('.order-price').innerText;
  });
  finalSum.innerText = sum;
}

function setTip(node, error) {
  node.style.boxShadow = '0px 0px 0px 1px red inset';
  if (node.nextSibling?.className !== 'input-tip') {
    const tip = document.createElement('div');
    tip.className = 'input-tip';
    tip.innerText = error;
    node.insertAdjacentElement('afterend', tip);
  }
}

function removeTip(node) {
  node.style.boxShadow = 'none';
  if (node.nextSibling?.className === 'input-tip') {
    node.nextSibling.remove();
  }
}

if (updateContent) {
  console.log(inputs);
  inputs.forEach((input) => {
    const order = input.closest('.drugOrder');
    const quantity = order.querySelector('.drug-quantity');
    const remainingQuantity = +quantity.innerText + +input.value;
    const priceNum = +order.querySelector('.drug-price').innerText;
    const orderPriceSpan = order.querySelector('.order-price');
    const { id } = input.dataset;

    input.addEventListener('input', async (event) => {
      removeTip(input);
      try {
        const response = await fetch(`/orders/${id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({ orderQuantity: input.value }),
        });
        if (response.status === 200) {
          const { msg, err, data } = await response.json();
          if (err) {
            if (err.orderQuantity) {
              setTip(input, err.orderQuantity);
              if (err.orderQuantity === 'Вы уже смели все что было!') {
                orderPriceSpan.innerText = +input.value * priceNum;
                quantity.innerText = remainingQuantity - +input.value;
                updateSum();
              }
            } else {
              setTip(input, err);
            }
          } else if (msg) {
            orderPriceSpan.innerText = +input.value * priceNum;
            quantity.innerText = remainingQuantity - +input.value;
            updateSum();
          }
        } else {
          setTip(input, 'Все упало...');
        }
      } catch (error) {
        console.log(error);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateSum();
});
