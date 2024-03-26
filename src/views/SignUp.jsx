const React = require('react');
const Layout = require('../../views/Layout');

function SignUp() {
  return (
    <Layout>
      <div className='container h-100'>
        <div className='row h-100 justify-content-center align-items-center'>
          <div className='col-10 col-md-8 col-lg-6'>
            {/* Form */}
            <form className='signup-form' action='' method='post'>
              <div className='form-group mt-5'>
                <input type='text' name='username' className='form-control' placeholder='name...' required />
              </div>
              <div className='form-group mt-5'>
                <input type='email' name='email' className='form-control' placeholder='email...' required />
              </div>
              <div className='form-group mt-5'>
                <input type='password' name='password' className='form-control' placeholder='password...' required />
              </div>
              <div className='form-group mt-5'>
                <select name='role' className='custom-select' required>
                  <option selected value=''>
                    select your role
                  </option>
                  <option value='buyer'>buyer</option>
                  <option value='seller'>seller</option>
                </select>
              </div>
              <div className='text-center mt-5'>
                <button type='submit' className='btn btn-secondary'>
                  &nbsp; register &nbsp;
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

module.exports = SignUp;
