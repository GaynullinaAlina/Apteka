const React = require('react');

module.exports = function Drug({ drug, userId, role }) {
  return (
    <div className="card">
      <span className="card-header">{drug.drugTitle}</span>
      <img src={drug.drugImageLink} alt="itemphoto" />
      <div className="card-content">{drug.drugDescription}</div>
      {role !== 'seller' && (
        <div className="card-button-wrapper">
          <button className="card-button order-button" data-id={drug.id} type="button">
            Добавить в корзину!
          </button>
        </div>
      )}
      <div className="card-info">
        <p>Цена со скидкой: {Math.ceil(drug.drugPrice * ((100 - drug.drugDiscount) / 100))} у.е.</p>
        <p>Старая цена: {drug.drugPrice} у.е.</p>
        <p>
          В наличии: <span className="item-quantity">{drug.drugQuantity}</span> шт.
        </p>
      </div>
    </div>
  );
};
