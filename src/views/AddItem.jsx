const React = require('react');
const Layout = require('./LayoutEXAM');

function AddItem() {
  return (
    <Layout>
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            {/* Form */}
            <form className="additem-form" action="" method="post">
              <div className="form-group">
                <input type="text" name="art" className="form-control" placeholder="art" required />
              </div>
              <div className="form-group">
                <input type="text" name="title" className="form-control" placeholder="title" required />
              </div>
              <div className="form-group">
                <textarea className="form-control" name="description" rows="3" placeholder="description" />
              </div>
              <div className="form-group">
                <input type="text" name="photolink" className="form-control" placeholder="link to photo" required />
              </div>
              <div className="form-row">
                <div className="col">
                  <input type="number" name="price" className="form-control" placeholder="price" required />
                </div>
                <div className="col">
                  <input type="number" name="quantity" className="form-control" placeholder="State" required />
                </div>
              </div>
              <div className="text-center mt-3">
                <button type="submit" className="btn btn-secondary">
                  add item
                </button>
              </div>
            </form>
            {/* Form end */}
          </div>
        </div>
      </div>
    </Layout>
  );
}

module.exports = AddItem;
