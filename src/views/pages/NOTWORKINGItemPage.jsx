const React = require('react');
const Layout = require('../Layout');
const Card = require('../components/Item');

module.exports = function ItemPage({ login, userId, title, card }) {
  return (
    <Layout login={login} title={title}>
      {/* <script defer src="/scripts/card-delete.js" /> */}
      <Card cardInfo={card} userId={userId} />
    </Layout>
  );
};
