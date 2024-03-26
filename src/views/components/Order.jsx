const React = require('react');

module.exports = function Order({ orderInfo, userId }) {
  console.log(orderInfo.orderUserId, userId);
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
  // itemArt
  // itemTitle
  // itemDescription
  // itemPhotoLink
  // itemPrice
  // itemQuantity
  return (
    <div className="card">
      <span className="card-header">{orderInfo.Item.itemTitle}</span>
      <p>Артикул: {orderInfo.Item.itemArt}</p>
      <img src={orderInfo.Item.itemPhotoLink} alt="itemphoto" />
      <div className="card-content">{orderInfo.Item.itemDescription}</div>

      {orderInfo.orderUserId === userId ? (
        <>
          <p>Количество товара:</p>
          <input type="number" name="userOrderQuantity" placeholder="userOrderQuantity" value={orderInfo.orderItemQuantity} />
          <p>К оплате: <span className="order-price">{orderInfo.Item.itemPrice * orderInfo.orderItemQuantity}</span> у.е.</p>
          <div className="card-button-wrapper">
            <button className="card-button order-update-button" data-id={orderInfo.id} type="button">
              Обновить заказ
            </button>
            <button className="card-button order-remove-button" data-id={orderInfo.id} type="button">
              Отменить заказ
            </button>
          </div>
        </>
      ) : null}
      <div className="card-info">
        <p>Цена за шт.: <span className="item-price">{orderInfo.Item.itemPrice}</span> у.е.</p>
        <p>
          В наличии у продавца: <span className="item-quantity">{orderInfo.Item.itemQuantity}</span> шт.
        </p>
        <p>
          Продавец: <a href={`/user/${orderInfo.User.login}`}>{orderInfo.User.login}</a>
        </p>
        <p>Заказано: {parseDate(orderInfo.Item.createdAt)}</p>
      </div>
    </div>
  );
};
