const React = require('react');
const Header = require('./components/Header');

module.exports = function Layout({
  children, login, title, role,
}) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/media/favicon.svg" type="image/x-icon" />
        <link rel="shortcut icon" href="/media/favicon.svg" type="image/x-icon" />
        <link rel="stylesheet" href="/styles/index.css" />
        <script defer src="/scripts/index.js" />
        <title>Document</title>
      </head>
      <body>
        <Header login={login} role={role} />
        <div className="background" />
        <div className="background-shader" />
        <div className="main-wrapper">
          <main>
            <span className="main-header">{title}</span>
            <div className="main-content">{children}</div>
          </main>
        </div>
        <footer />
      </body>
    </html>
  );
};
