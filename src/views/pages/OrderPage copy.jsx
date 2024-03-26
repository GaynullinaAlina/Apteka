const React = require('react');
const Layout = require('../Layout');

// drugTitle: DataTypes.STRING,
// drugDescription: DataTypes.TEXT,
// drugQuantity: DataTypes.INTEGER,
// drugPrice: DataTypes.INTEGER,
// drugDiscount: DataTypes.INTEGER,
// drugImageLink: DataTypes.TEXT,
// drugRating: DataTypes.INTEGER,
// drugIsFree: DataTypes.BOOLEAN,
// orderUserId: DataTypes.INTEGER,
// orderDrugId: DataTypes.INTEGER,
// orderQuantity: DataTypes.INTEGER,
// },

module.exports = function OrderPage({ login, orders }) {
  return (
    <Layout login={login}>
      <script defer src="/scripts/OrderPageDelete.js"></script>
      <script defer src="/scripts/OrderPageUpdate.js"></script>
      <div className="card-wrapper">
        {orders.length ? (
          orders.map((el) => (
            <div className="drug">
              {/* <img src={el.Drug.drugImageLink} alt="drug" /> */}
              <h4>{el.Drug.drugTitle}</h4>
              {/* <p>{JSON.stringify(el)}</p> */}
              {/* <input type="number" name="quantity" className="form-control" placeholder="quantity" required value={el.orderQuantity} />
              <button type="button" id={el.id}>
                Оплатить!
              </button> */}
              <p>
                Цена за шт.: <span className="drug-price">{el.Drug.drugPrice}</span> р.
              </p>
              <p>
                Осталось на складе: <span className="drug-quantity">{el.Drug.drugQuantity}</span> шт.
              </p>
              <p>Количество товара в заказе:</p>
              <input type="number" name="userOrderQuantity" placeholder="orderQuantity" value={el.orderQuantity} />
              <p>
                К оплате: <span className="order-price">{el.Drug.drugPrice * el.orderQuantity}</span> р.
              </p>
              <div className="card-button-wrapper">
                <button className="card-button order-update-button" data-id={el.id} type="button">
                  Обновить заказ
                </button>
                <button className="card-button order-remove-button" data-id={el.id} type="button">
                  Отменить заказ
                </button>
              </div>
              <hr />
            </div>
          ))
        ) : (
          <p>Ваша корзина пока пуста</p>
        )}
      </div>
    </Layout>
  );
};
