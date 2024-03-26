/* eslint-disable no-param-reassign */
const form = document.querySelector('form');
const loginInput = form.querySelector('input[name="login"]');
const passwordInput = form.querySelector('input[name="password"]');
const button = form.querySelector('button');

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

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  button.disabled = true;
  const data = new FormData(form);
  const inputs = Object.fromEntries(data);
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });
    if (response.status === 200) {
      const { err, msg } = await response.json();
      if (err) {
        if (err.login) {
          setTip(loginInput, err.login);
        } else if (err.password) {
          setTip(passwordInput, err.password);
        } else {
          button.innerText = err;
        }
        button.disabled = false;
      } else if (msg) {
        button.innerText = msg;
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }
    } else {
      button.innerText = 'Все упало...';
    }
  } catch (error) {
    console.log(error);
  }
});

loginInput.addEventListener('input', () => removeTip(loginInput));
passwordInput.addEventListener('input', () => removeTip(passwordInput));
