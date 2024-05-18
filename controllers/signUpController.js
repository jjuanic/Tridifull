
//importamos la conexion a la base de datos
const connection = require('../models/config');
const Swal = require('sweetalert2')

// Middleware para mostrar mensajes de alerta
const showAlert = (req, res, next) => {
    res.locals.alert = req.session.alert;
    delete req.session.alert;
    next();
};


const signUpPage = (req, res) => {
    res.render('signup', {user:false});
};

const signUpUser = (req, res) => {
    const user = req.body.user;
    const password = req.body.password;

    console.log(user, password);

    const sqlQuery = `INSERT INTO User SET ?`;
    const datoSql = {
        username: user,
        password: password,
    };

    // Execute query to insert user data
    connection.query(sqlQuery, datoSql, (err, result) => {
        if (err) {
            console.log('Error al insertar los datos');
            console.log(err);
            res.send('Error al insertar los datos');
        } else {
            console.log('Datos insertados correctamente');
            
            res.render('login',{user:true});
            
        }
    });
};

module.exports = {
    showAlert,
    signUpPage,
    signUpUser
}