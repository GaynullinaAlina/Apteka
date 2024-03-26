const React = require('react');
const Layout = require('./LayoutEXAM');

function AllItems() {
  return (
    <Layout>
      <div className='card text-center' style={{ width: '18rem' }}>
        <img src='#' className='card-img-top' alt='some image' />
        <div className='card-body '>
          <h5 className='card-title'>Item name</h5>
          <p className='card-text'>Item description</p>
          {/* <a href="#" class="btn btn-secondary btn-sm">add to card</a> */}
        </div>
      </div>
    </Layout>
  );
}

module.exports = AllItems;
