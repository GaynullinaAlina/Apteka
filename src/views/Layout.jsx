const React = require('react');

module.exports = function Layout({ children, login, userId }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Социальная аптека</title>
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Neucha&display=swap"
          rel="stylesheet"
        /> */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link rel="icon" href="/media/logo_fixed.svg" type="image/x-icon" />
        <link rel="shortcut icon" href="/media/logo_fixed.svg" type="image/x-icon" />
        <link rel="stylesheet" href="/styles/index.css" />
        <script defer src="/scripts/index.js" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {login ? (
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <a className="navbar-brand" href="/" style={{ margin: '10px' }}>
                <img src="/media/logo.svg" alt="mainLogo" />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup" style={{ height: '70px', flexDirection: 'row-reverse' }}>
                <div className="navbar-nav">
                  <a className="nav-link" href={`/orders/${userId}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span class="material-symbols-outlined">shopping_cart_checkout</span>
                    <div>Авоська!</div>
                  </a>
                  <a className="nav-link" href="/user" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span class="material-symbols-outlined">person</span>
                    <div>Картотека</div>
                  </a>
                  <a className="nav-link" href="/logout" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span class="material-symbols-outlined">logout</span>
                    <div>Уйти</div>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        ) : (
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <a className="navbar-brand" href="/" style={{ margin: '10px' }}>
                <img src="/media/logo.svg" alt="mainLogo" />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup" style={{ height: '70px', flexDirection: 'row-reverse' }}>
                <div className="navbar-nav">
                  <a className="nav-link" href="/auth/login" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span class="material-symbols-outlined">login</span>
                    <div>Я тут уже была</div>
                  </a>
                  <a className="nav-link" href="/auth/register" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span class="material-symbols-outlined">how_to_reg</span>
                    <div>Завести карточку</div>
                  </a>
                </div>
              </div>
            </div>
          </nav>
        )}
        <hr />
        <div className="bodyMainContent">{children}</div>
        <hr />
        <footer className="footer">
          <img src="/media/mainLogo.svg" alt="footer" style={{ width: '5%' }} />
          <div>Copyright © 2024, Все права почти защищены</div>
        </footer>
      </body>
    </html>
  );
};
