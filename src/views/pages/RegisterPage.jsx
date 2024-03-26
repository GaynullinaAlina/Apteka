const React = require('react');
const Layout = require('../Layout');

module.exports = function RegisterPage({ title }) {
  return (
    <Layout title={title}>
      <script defer src="/scripts/auth-register.js" />
      <form className="form" style={{ margin: '20px' }}>
        <div className="formReg">
          <fieldset>
            <legend>Обязательные поля:</legend>
            <p>Придумайте логин:</p>
            <input
              style={{ width: '50%', margin: '0 auto 20px' }}
              maxLength="40"
              name="login"
              type="text"
              placeholder="login"
            />
            <p>Введите ваш Email:</p>
            <input
              style={{ width: '50%', margin: '0 auto 20px' }}
              maxLength="40"
              name="email"
              type="email"
              placeholder="example@email.com"
            />
            <p>Придумайте пароль:</p>
            <input
              style={{ width: '50%', margin: '0 auto 20px' }}
              maxLength="40"
              name="password"
              type="password"
              placeholder="password"
            />
            <p>Напишите ваше Имя:</p>
            <input
              style={{ width: '50%', margin: '0 auto 20px' }}
              maxLength="40"
              name="userName"
              type="text"
              placeholder="name"
            />
            <p>Напишите ваш номер телефона:</p>
            <input
              style={{ width: '50%', margin: '0 auto 20px' }}
              maxLength="40"
              name="userPhone"
              type="text"
              placeholder="phone"
            />
            <p>Загрузите фото в профиль:</p>
            <input
              style={{ width: '50%', margin: '0 auto 20px' }}
              name="userImageLink"
              type="text"
              placeholder="Please enter link to photo"
            />
            <p>Дата вашего рождения:</p>
            <input
              style={{ width: '50%', margin: '0 auto 20px' }}
              name="userBirthDate"
              type="date"
              placeholder="password"
            />
          </fieldset>
          <button type="submit" className="main-button">
            Регистрация!
          </button>
        </div>
      </form>
    </Layout>
  );
};
//userName, userPhone, userImageLink, userBirthDate
