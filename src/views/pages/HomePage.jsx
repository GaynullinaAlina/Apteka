const React = require('react');
const Layout = require('../Layout');

const Card = require('../components/Card');

module.exports = function HomePage({ drugs = [], login, drugIsFree, userId }) {
  return (
    <Layout login={login} userId={userId}>
      <script defer src="/scripts/HomePageCalendar.js"></script>
      <script defer src="/scripts/HomePageDrugs.js"></script>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
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
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <img style={{ width: '100%' }} src="/media/banner.jpg" alt="banner" />
          </div>
        </div>
      </nav>
      <hr />
      {/* <div
      className="calendarContainer"
      style={{
        width: "100%",
        height: "200px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    > */}
      <h3 style={{ display: 'flex', justifyContent: 'center' }}>Товары недели</h3>
      <div className="free-drugs-container">
        {drugIsFree.length ? (
          drugIsFree.map((drug) => (
            <div class="drug-card">
              <div class="drug-card-img-wrapper">
                <img src={drug.drugImageLink} alt={drug.drugTitle} />
                <div class="drug-card-discount">-{drug.drugIsFree ? '100' : drug.drugDiscount}%</div>
              </div>
              <div class="drug-card-price">
                {drug.drugDiscount || drug.drugIsFree ? (
                  <div class="drug-card-price-discount">
                    <span class="drug-card-price-discount-span">{Math.floor(drug.drugPrice * (drug.drugIsFree ? 0 : (100 - drug.drugDiscount) / 100))} Рубь!</span>
                    <span class="drug-card-price-footer">Новая цена</span>
                  </div>
                ) : null}
                <div class="drug-card-price-old">
                  <span>{drug.drugPrice} рубь</span>
                  <span class="drug-card-price-footer">Старая цена</span>
                </div>
              </div>
              <div class="drug-card-title">{drug.drugTitle}</div>
              <span class="drug-quantity-span">
                На складе: <span class="drug-quantity">{drug.drugQuantity}</span> шт.
              </span>
              <button class="drug-order-button" data-id={drug.id}>
                В авоську!
              </button>
            </div>
            // <div class="drug-card">
            //   <div class="drug-card-img-wrapper">
            //     <img src="${drug.drugImageLink}" alt="${drug.drugTitle}" />
            //     <div class="drug-card-discount">-${drug.drugDiscount}%</div>
            //   </div>
            //   <div class="drug-card-price">
            //     <div class="drug-card-price-discount">
            //       <span className="drug-card-price-discount-span">${drug.drugPrice} Рубь!</span>
            //       <span className="drug-card-price-footer">Новая цена</span>
            //     </div>
            //     <div class="drug-card-price-old">
            //       <span>${drug.drugPrice} рубь</span>
            //       <span className="drug-card-price-footer">Старая цена</span>
            //     </div>
            //   </div>
            //   <div className="drug-card-title">${drug.drugTitle}</div>
            //   <button class="drug-order-button">В авоську!</button>
            // </div>
          ))
        ) : (
          <>Бесплатных товаров нет</>
        )}
        {/* <div className="col card" style={{ width: '15rem' }}>
              <img src={drug.drugImageLink} alt="cardLogo" style={{ marginTop: '5px' }} />
              <div className="card-body">
                <h4 className="card-title">{drug.drugTitle}</h4>
                <p>Цена: 0 ₽</p>
                <p className="card-text">Описание: {drug.drugDescription}</p>
                <a href="#" className="btn btn-primary" style={{ marginBottom: '5px' }}>
                  В корзину
                </a>
              </div>
            </div> */}
        <div className="calendar-wrapper">
          <span className="calendar-next-week">А на следующей неделе?</span>
          <input type="week" />
        </div>
      </div>
      <hr />
      {/* </div> */}
      {/* <div className="allDrugs">
        {drugs.length ? (drugs.map((el) => (
          <div className="drugItem">
            <img src={el.drugImageLink} alt="drug" />
            <h4>{el.drugTitle}</h4>
            <p>{el.drugPrice}</p>
            <form method="POST" action="/orders">
              <input name="orderId" type="hidden" value={el.id} />
              <button type="submit">В корзину!</button>
            </form>
          </div>
        ))) : ('Здесь пока пусто!')}
      </div> */}
      <nav className="navbar bg-body-tertiary">
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', width: '100%', gap: '10px', padding: '0 10px' }}>
          {/* <form className="d-flex" role="search"> */}
          <input className="form-control me-2 drugs-search" style={{ width: 'auto', flex: '1' }} type="search" placeholder="Поиск по названию" ariaLabel="Search" />
          {/* <button className="btn btn-outline-success" type="submit">
              Поиск
            </button> */}
          <button className="btn btn-outline-success sort-button-asc" type="button">
            По убыванию
          </button>
          <button className="btn btn-outline-success sort-button-desc" type="button">
            По возрастанию
          </button>
          {/* </form> */}
        </div>
      </nav>
      <hr />
      <div className="drugs-container">
        {/* {drugs.map((el) => (
          <Card drug={el} />
        ))} */}
      </div>
    </Layout>
  );
};
