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

function Basket({ login, drugs }) {
  return (
    <Layout login={login}>
      <div className="card-wrapper">
        {drugs.length ? drugs.map((el) => (
          <div className="drug">
            <img src={el.Drug.drugImageLink} alt="drug" />
            <h4>{el.Drug.drugTitle}</h4>
            <p>{el.Drug.drugPrice}</p>
            <input type="number" name="quantity" className="form-control" placeholder="quantity" required value={el.orderQuantity} />
            <button type="button" id={el.id}>Оплатить!</button>
          </div>
        ))
          : (<p>Ваша корзина пока пуста</p>)}
      </div>
    </Layout>

  );
}
module.exports = Basket;
