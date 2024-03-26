const React = require('react');
const Layout = require('../Layout');

// login: DataTypes.STRING,
//       email: DataTypes.STRING,
//       password: DataTypes.STRING,
//       userName: DataTypes.STRING,
//       userPhone: DataTypes.STRING,
//       userImageLink: DataTypes.TEXT,
//       userBirthDate: DataTypes.DATE,

function UserPage({login, user, userId}) {
    return(
      <Layout login={login} userId={userId}>
        <script defer src="/scripts/updateUser.js"/>
        <div className='container' style={{display:'flex'}}>
        <div className="card" style={{width: '13rem', border:'none', margin:'0px 15px 0px 15px'}}>
        <img  src={user.userImageLink} alt="Card image cap"/>
        </div>
        <div className='savedUser'>
      <div class="form-group row">
            <label for="inputName3" class="col-sm-2 col-form-label">Ваше имя:</label>
            <div class="col-sm-10">
                <p style={{margin:'30px'}}>{user.userName} </p>
            </div>
        </div><div class="form-group row">
                <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                <div class="col-sm-10">
                <p style={{margin:'10px'}}>{user.email} </p>
                </div>
            </div><div class="form-group row">
                <label for="inputPhonel3" class="col-sm-2 col-form-label">Номер телефона:</label>
                <div class="col-sm-10">
                    <p style={{margin:'30px'}}>{user.userPhone}</p>
                </div>
            </div><div class="form-group row">
                <label for="userBirthDate3" class="col-sm-2 col-form-label">Дата рождения:</label>
                <div class="col-sm-10">
                    <p style={{margin:'30px'}}>{user.userBirthDate.toISOString().slice(0, 10)}</p>
                </div>
            </div><div class="form-group row">
                <div class="col-sm-10">
                    <button type="button" class="btn btn-primary">Редактировать!</button>
                </div>
            </div>
            </div>
        <form className='userForm' style={{display:'none'}}>
        <div class="form-group row">
          <label for="inputName3" class="col-sm-2 col-form-label">Ваше имя:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control" name='userName' id="inputName3" defaultValue={user.userName} />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputEmail3" class="col-sm-2 col-form-label" >Email</label>
          <div class="col-sm-10">
            <input type="email" name='email'class="form-control" id="inputEmail3" defaultValue={user.email}/>
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPhonel3" class="col-sm-2 col-form-label" >Номер телефона:</label>
          <div class="col-sm-10">
            <input type="text" name='userPhone' class="form-control" id="inputPhonel3" defaultValue={user.userPhone}/>
          </div>
        </div>
        <div class="form-group row">
          <label for="userBirthDate3" class="col-sm-2 col-form-label" >Дата рождения:</label>
          <div class="col-sm-10">
            <input type="date" name='userBirthDate' class="form-control" id="userBirthDate3" defaultValue={user.userBirthDate.toISOString().slice(0,10)}/>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <button type="submit" class="btn btn-primary">Сохранить</button>
          </div>
        </div>
      </form>
      </div>
      </Layout>
    )
}

module.exports = UserPage;