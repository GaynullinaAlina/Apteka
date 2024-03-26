const React = require('react');
const Layout = require('../Layout');
const Drug = require('../components/Drug');

module.exports = function HomePage({ login, userId, drugs }) {
  return (
    <Layout login={login}>
      {/* <script defer src="/scripts/item-delete.js" />
      <script defer src="/scripts/item-order.js" /> */}
      <div className="card-wrapper">{drugs.length ? drugs.map((el) => <Drug userId={userId} drug={el} />) : 'Лекарства закончились!'}</div>
    </Layout>
  );
};
