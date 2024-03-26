const userRouter = require('express').Router();
const renderTemplate = require('../lib/renderTemplate');
const UserPage = require('../views/pages/UserPage')
const {User} = require('../../db/models')


userRouter.get('/', async(req,res) => {
    const{login, userId} =req.session;
    // const{userName, email, phone, userBirthDate } = req.body;
    try {
        const user = await User.findOne({where:{id: userId}});
        console.log(user);
        renderTemplate(UserPage, {login, user, userId}, res)
    } catch (error) {
        console.log(error);
        res.json({err:'Ошибка в отрисовке юзера!'})
    }
})

userRouter.put('/', async(req,res) => {
    const{login, userId} =req.session;
    const{userName, email, phone, userBirthDate } = req.body;
   try {
    const user = await User.findOne({where:{id: userId}});
    const newUser = await user.update({userName, email, phone, userBirthDate});
    console.log('--------->',newUser);
    res.json(newUser);
   } catch (error) {
    console.log(error);
        res.json({err:'Ошибка в изменении юзера!'})
   }
})

module.exports = userRouter;