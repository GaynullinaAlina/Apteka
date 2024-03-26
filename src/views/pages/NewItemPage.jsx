const React = require('react');
const Layout = require('../Layout');

module.exports = function NewItemPage({ login, title, role }) {
  return (
    <Layout login={login} title={title} role={role}>
      <script defer src="/scripts/item-new.js" />
      <form className="form">
        <fieldset>
          <legend>Обязательные поля:</legend>
          <p>Введите артикул товара:</p>
          <input maxLength="255" name="itemArt" type="text" placeholder="itemArt" />
          <p>Введите название товара:</p>
          <input maxLength="255" name="itemTitle" type="text" placeholder="itemTitle" />
          <p>Введите описание товара:</p>
          <textarea maxLength="2000" name="itemDescription" type="text" placeholder="itemDescription" />
          <p>Добавьте ссылку на фото:</p>
          <input type="text" name="itemPhotoLink" placeholder="itemPhotoLink" />
          <p>Введите цену:</p>
          <input type="number" name="itemPrice" placeholder="itemPrice" />
          <p>Введите количество:</p>
          <input type="number" name="itemQuantity" placeholder="itemQuantity" />
        </fieldset>
        <button type="submit" className="main-button">
          Добавить товар!
        </button>
      </form>
    </Layout>
  );
};
