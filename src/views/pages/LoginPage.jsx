const React = require('react');
const Layout = require('../Layout');

module.exports = function LoginPage({ title }) {
  return (
    <Layout title={title}>
      <script defer src="/scripts/auth-login.js" />
      <form className="form">
        <div className="formLog">
        <fieldset>
          <legend>Обязательные поля:</legend>
          <p>Введите логин или почту:</p>
          <input
            style={{ width: '50%', margin: '0 auto 20px' }}
            maxLength="40"
            name="login"
            type="text"
            placeholder="login"
          />
          <p>Введите пароль:</p>
          <input
            style={{ width: '50%', margin: '0 auto 20px' }}
            maxLength="40"
            name="password"
            type="password"
            placeholder="password"
          />
        </fieldset>
        <button type="submit" className="main-button">
          Войти!
        </button>
        </div>
      </form>
    </Layout>
  );
};
