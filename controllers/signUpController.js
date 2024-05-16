
//importamos la conexion a la base de datos
const connection = require('../models/config');

const signUpPage = (req, res) => {
    res.render('signup')
};

const signUpUser = (req, res) => {
    const user = req.body.user;
    const password = req.body.password;

    console.log(user, password);

    const sqlQuery = `INSERT INTO User SET ?`;
    const datoSql = {
        username: user,
        password: password,
    }

    //Ejecuto una consulta a la base de datos con el método query
    connection.query(sqlQuery, datoSql, (err, result) => {
        if (err) {
            console.log('Error al insertar los datos');
            console.log(err);
            res.send('Error al insertar los datos');
        } else {
            console.log('Datos insertados correctamente');
            console.log(result);
            //res.send('Datos insertados correctamente');
            // avisar
            res.redirect('/login');
        }
    })}

module.exports = {
    signUpPage,
    signUpUser
}