
//importamos la conexion a la base de datos
const connection = require('../models/config');

const loginPage = (req, res) => {
    res.render('login')
};

const loginUser = (req, res) => {
    user = req.body.user;
    password = req.body.password;
    console.log('user', 'password');

    }

    module.exports = {
        loginPage,
        loginUser
    }