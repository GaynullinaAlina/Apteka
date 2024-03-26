/* eslint-disable no-param-reassign */
const form = document.querySelector('form');
const loginInput = form.querySelector('input[name="login"]');
const emailInput = form.querySelector('input[name="email"]');
const passwordInput = form.querySelector('input[name="password"]');
const userNameInput = form.querySelector('input[name="userName"]');
const userPhoneInput = form.querySelector('input[name="userPhone"]');
const userImageLinkInput = form.querySelector('input[name="userImageLink"]');
const userBirthDateInput = form.querySelector('input[name="userBirthDate"]');

// const roleInput = form.querySelector('select[name="role"]');
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
    const response = await fetch('/auth/register', {
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
        } else if (err.email) {
          setTip(emailInput, err.email);
        } else if (err.password) {
          setTip(passwordInput, err.password);
        }  
        else if (err.userName) {
          setTip(userNameInput, err.userName);
        }  
        else if (err.userPhone) {
          setTip(userPhoneInput, err.userPhone);
        }  
        else if (err.userImageLink) {
          setTip(userImageLinkInput, err.userImageLink);
        }  
        else if (err.userBirthDate) {
          setTip(userBirthDateInput, err.userBirthDate);
        }  
        else {
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
emailInput.addEventListener('input', () => removeTip(emailInput));
passwordInput.addEventListener('input', () => removeTip(passwordInput));
userNameInput.addEventListener('input', () => removeTip(userNameInput));
userPhoneInput.addEventListener('input', () => removeTip(userPhoneInput));
userImageLinkInput.addEventListener('input', () => removeTip(userImageLinkInput));
userBirthDateInput.addEventListener('input', () => removeTip(userBirthDateInput));