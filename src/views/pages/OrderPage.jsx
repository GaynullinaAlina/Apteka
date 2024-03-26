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

module.exports = function OrderPage({ login, userId, orders, totalCost }) {
  return (
    <Layout login={login} userId={userId}>
      <script defer src="/scripts/OrderPageDelete.js"></script>
      <script defer src="/scripts/OrderPageUpdate.js"></script>
      <div className="card-wrapper">
        <table className="table table-striped" style={{ textAlign: 'center' }}>
          <thead>
            <tr>
              <th scope="col">Название</th>
              <th scopr="col">В наличии</th>
              <th scope="col">Цена за шт</th>
              <th scope="col">Штук</th>
              <th scope="col">Сумма</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((el) => (
              <tr className="drugOrder" id={el.id}>
                <td scope="row">{el.Drug.drugTitle}</td>
                <td>
                  <span className="drug-quantity">{el.Drug.drugQuantity}</span> шт
                </td>
                <td>
                  <span className="drug-price">{Math.floor(el.Drug.drugPrice * (el.Drug.drugIsFree ? 0 : (100 - el.Drug.drugDiscount) / 100))}</span> рубь
                </td>
                <td>
                  <input data-id={el.id} style={{ width: '70px', textAlign: 'center' }} type="number" name="userOrderQuantity" placeholder="orderQuantity" value={el.orderQuantity} />
                </td>
                <td>
                  <span className="order-price">{Math.floor(el.Drug.drugPrice * (el.Drug.drugIsFree ? 0 : (100 - el.Drug.drugDiscount) / 100)) * el.orderQuantity}</span> рубь
                </td>
                <td>
                  <button className="card-button order-remove-button" data-id={el.id}>
                    Не хочу
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: 'end', marginRight: '20px' }}>
          Итого: <span className="final-sum">0</span> рубь
        </div>
      </div>
    </Layout>
  );
};
