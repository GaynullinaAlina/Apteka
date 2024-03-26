const React = require('react');
const Layout = require('../Layout');
const Item = require('../components/Item');

module.exports = function HomePage({
  login, userId, role, title, items,
}) {
  return (
    <Layout login={login} title={title} role={role}>
      <script defer src="/scripts/item-delete.js" />
      <script defer src="/scripts/item-order.js" />
      {role === 'seller' ? (
        <>
          <div className="button-wrapper">
            <a href="/item/new" className="main-button">
              Добавить новый товар!
            </a>
          </div>
          <br />
        </>
      ) : null}
      <div className="card-wrapper">{items.length ? items.map((el) => <Item userId={userId} itemInfo={el} role={role} />) : 'Товаров пока нет. Продайте что-нибудь!'}</div>
    </Layout>
  );
};
