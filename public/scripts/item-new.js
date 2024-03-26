/* eslint-disable no-param-reassign */
const form = document.querySelector('form');
const itemArtInput = form.querySelector('input[name="itemArt"]');
const itemTitleInput = form.querySelector('input[name="itemTitle"]');
const itemDescriptionInput = form.querySelector('textarea[name="itemDescription"]');
const itemPhotoLinkInput = form.querySelector('input[name="itemPhotoLink"]');
const itemPriceInput = form.querySelector('input[name="itemPrice"]');
const itemQuantityInput = form.querySelector('input[name="itemQuantity"]');
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
    const response = await fetch('/item/new', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(inputs),
    });
    if (response.status === 200) {
      const { err, msg } = await response.json();
      console.log(err, msg);
      if (err) {
        if (err.itemArt) {
          setTip(itemArtInput, err.itemArt);
        } else if (err.itemTitle) {
          setTip(itemTitleInput, err.itemTitle);
        } else if (err.itemDescription) {
          setTip(itemDescriptionInput, err.itemDescription);
        } else if (err.itemPhotoLink) {
          setTip(itemPhotoLinkInput, err.itemPhotoLink);
        } else if (err.itemPrice) {
          setTip(itemPriceInput, err.itemPrice);
        } else if (err.itemQuantity) {
          setTip(itemQuantityInput, err.itemQuantity);
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

itemArtInput.addEventListener('input', () => removeTip(itemArtInput));
itemTitleInput.addEventListener('input', () => removeTip(itemTitleInput));
itemDescriptionInput.addEventListener('input', () => removeTip(itemDescriptionInput));
itemPhotoLinkInput.addEventListener('input', () => removeTip(itemPhotoLinkInput));
itemPriceInput.addEventListener('input', () => removeTip(itemPriceInput));
itemQuantityInput.addEventListener('input', () => removeTip(itemQuantityInput));
