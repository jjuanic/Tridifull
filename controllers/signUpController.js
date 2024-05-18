import { validationResult } from "express-validator";
import connection from '../models/config.js';
import bcrypt from "bcrypt";

const con = connection.promise();

const signUpPage = (req, res) => {
    res.render('signup', {user: false, title: 'Sign Up'});
};

const signUpUser = async (req, res) => {
    try {
        const controlError = validationResult(req);
        if (!controlError.isEmpty()) {
            console.log('Error de datos mal ingresados');
            return res.render('signup', {
                errores: 'Error en los datos ingresados'
            });
        }

        const user = req.body.user;
        const password = req.body.password;
        const email = req.body.email;
        const creationDate = new Date();

        const [rows] = await con.execute('SELECT COUNT(*) AS count FROM User WHERE email = ? OR username = ?', [email, user]);
        const count = rows[0].count;

        if (count > 0) {
            console.log('Usuario ya registrado');
            return res.render('signup', {
                errores: 'El usuario ya está registrado'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [result] = await con.execute('INSERT INTO User SET username = ?, password = ?, email = ?, creationDate = ?', [user, hashedPassword, email, creationDate]);

        console.log('Datos insertados correctamente');
        return res.render('login', { user: true });
    } catch (error) {
        console.error('Error al insertar los datos:', error);
        return res.render('signup', {
            errores: 'Error al insertar los datos'
        });
    }
};

export {
    signUpPage,
    signUpUser
};
