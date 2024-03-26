const React = require("react");

module.exports = function Card({ drug }) {
  return (
    <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap' }}>
      <div className="card" style={{ width: "15rem", flex: '1', marginRight: '10px' }}>
        <img
          src={drug.drugImageLink}
          alt="cardLogo"
          style={{ width: "322px", height: "322px" }}
        />
        <div className="card-body">
          <h4 className="card-title">{drug.drugTitle}</h4>
          {drug.drugIsFree ? (
            <>
              <p>Цена: 0 ₽</p>
              <></>
            </>
          ) : (
            <>
              <p>Цена: {drug.drugPrice} ₽</p>
              <p>Скидка: {drug.drugDiscount} %</p>
              <p>
                Цена со скидкой:{" "}
                {Math.floor(drug.drugPrice * ((100 - drug.drugDiscount) / 100))}{" "}
                ₽
              </p>
            </>
          )}
          <p className="card-text" style={{ width: "274px", height: "180px" }}>Описание: {drug.drugDescription}</p>
          <p className="card-text">
            На складе:{" "}
            <span className="drug-quantity">{drug.drugQuantity}</span> шт.
          </p>
          <button
            type="button"
            className="drug-order-button btn btn-primary"
            data-id={drug.id}
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};
