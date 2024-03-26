const React = require('react');

function Layout({ children, title, message }) {
  return (
    <html lang="ru">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        {/* Bootstrap CSS */}
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossOrigin="anonymous"
        />
        {/* Bootstrap Scripts */}
        <title>Hello, shop!</title>
        <script
          defer
          src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
          integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
          crossOrigin="anonymous"
        />
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
          integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
          crossOrigin="anonymous"
        />
        <script
          defer
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
          integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
          crossOrigin="anonymous"
        />
        {/* User Scripts */}
        {/* <script defer src="..."></scrip */}
      </head>
      <body>

        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <a className="navbar-brand" href="/">Look My Shop</a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">

                <li className="nav-item">
                  <a className="nav-link mr-4" href="#">item-1</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mr-4" href="#">item-2</a>
                </li>
                <li className="nav-item mr-4">
                  <a className="nav-link mr-4" href="#">item-3</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">item-4</a>
                </li>

              </ul>
            </div>
          </nav>
          <div className="jumbotron">
            <h3 className="display-9 text-center text-dark">{title}Title</h3>
            <p className="lead text-center text-secondary">{message}Some information<br /> for user</p>
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}

module.exports = Layout;
