const React = require('react');

module.exports = function Item({ itemInfo, userId, role }) {
  function parseDate(unparsedDate) {
    const months = {
      '.01.': ' января ',
      '.02.': ' февраля ',
      '.03.': ' марта ',
      '.04.': ' апреля ',
      '.05.': ' мая ',
      '.06.': ' июня ',
      '.07.': ' июля ',
      '.08.': ' августа ',
      '.09.': ' сентября ',
      '.10.': ' октября ',
      '.11.': ' ноября ',
      '.12.': ' декабря ',
    };
    const date = unparsedDate.toLocaleDateString();
    const dateMonth = months[date.slice(2, 6)];
    const time = unparsedDate.toLocaleTimeString().slice(0, 5);
    return `${date.slice(0, 2) + dateMonth + date.slice(6)}, в ${time}`;
  }

  return (
    <div className="card">
      <a href={`/card/${itemInfo.id}`} className="card-header">
        {itemInfo.itemTitle}
      </a>
      <p>Артикул: {itemInfo.itemArt}</p>
      <img src={itemInfo.itemPhotoLink} alt="itemphoto" />
      <div className="card-content">{itemInfo.itemDescription}</div>
      {role !== 'seller' ? (
        <div className="card-button-wrapper">
          <button className="card-button order-button" data-id={itemInfo.id} type="button">
            Добавить в корзину!
          </button>
        </div>
      ) : null}
      {itemInfo.itemUserId === userId ? (
        <div className="card-button-wrapper">
          <a href={`/item/edit/${itemInfo.id}`} className="card-button edit-button" data-id={itemInfo.id}>
            Редактировать
          </a>
          <button className="card-button delete-button" data-id={itemInfo.id} type="button">
            Удалить
          </button>
        </div>
      ) : null}
      <div className="card-info">
        <p>Цена: {itemInfo.itemPrice} у.е.</p>
        <p>
          В наличии: <span className="item-quantity">{itemInfo.itemQuantity}</span> шт.
        </p>
        <p>
          Продавец: <a href={`/user/${itemInfo.User.login}`}>{itemInfo.User.login}</a>
        </p>
        <p>От: {parseDate(itemInfo.createdAt)}</p>
      </div>
    </div>
  );
};
