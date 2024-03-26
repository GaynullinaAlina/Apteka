const React = require('react');
const Layout = require('../Layout');

module.exports = function EditCardPage({
  login, title, item, role,
}) {
  return (
    <Layout login={login} title={title} role={role}>
      <script defer src="/scripts/item-edit.js" />
      <form className="form">
        <fieldset>
          <legend>Обязательные поля:</legend>
          <p>Обновите артикул товара:</p>
          <input maxLength="255" name="itemArt" type="text" placeholder="itemArt" value={item.itemArt} />
          <p>Обновите название товара:</p>
          <input maxLength="255" name="itemTitle" type="text" placeholder="itemTitle" value={item.itemTitle} />
          <p>Обновите описание товара:</p>
          <textarea maxLength="2000" name="itemDescription" type="text" placeholder="itemDescription" value={item.itemDescription} />
          <p>Обновите ссылку на фото:</p>
          <input type="text" name="itemPhotoLink" placeholder="itemPhotoLink" value={item.itemPhotoLink} />
          <p>Обновите цену:</p>
          <input type="number" name="itemPrice" placeholder="itemPrice" value={item.itemPrice} />
          <p>Обновите количество:</p>
          <input type="number" name="itemQuantity" placeholder="itemQuantity" value={item.itemQuantity} />
        </fieldset>
        <button type="submit" className="main-button">
          Обновить товар!
        </button>
      </form>
    </Layout>
  );
};
