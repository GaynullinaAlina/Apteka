const React = require('react');

function ShoppingCard() {
  return (
    <div className="card mb-3" style={{ maxWidth: 540, height: 150 }}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src="#" className="card-img" alt="some image" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Item title</h5>
            <form action="" method="POST">
              <div className="form-row">
                <div className="col">
                  <input type="number" name="quantity" className="form-control" placeholder="quantity" required />
                </div>
                <div className="col">
                  <span className="form-control"><b>1000p.</b></span>
                </div>
                <div className="col">
                  <button className="form-control btn btn-secondary">buy</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

module.exports = ShoppingCard;
