
//importamos la conexion a la base de datos
import connection from '../models/config.js';

const loginPage = (req, res) => {
    res.render('login')
};

const loginUser = (req, res) => {
    user = req.body.user;
    password = req.body.password;
    console.log('user', 'password');

    }

export {
    loginPage,
    loginUser
}