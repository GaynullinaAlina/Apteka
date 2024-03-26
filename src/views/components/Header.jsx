/* eslint-disable no-nested-ternary */
const React = require('react');

module.exports = function Header({ login, role }) {
  return (
    <header>
      <div className="header-content">
        <a className="header-title" href="/">Симулятор {!role ? 'симулятора' : role === 'seller' ? 'продавца' : 'покупателя'}</a>
        <div className="button-wrapper">
          { login ? (
            <>
              <a className="main-button" href={`/user/${login}`}>Привет, {login}!</a>
              <a className="main-button" href="/logout">Выйти</a>
            </>
          ) : (
            <>
              <a className="main-button" href="/auth/register">Регистрация</a>
              <a className="main-button" href="/auth/login">Войти</a>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
