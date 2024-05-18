import { validationResult } from "express-validator";
import connection from '../models/config.js';
import bcrypt from "bcrypt";
import generarJWT from '../middlewares/generarJWT.js';
import dotenv from 'dotenv';
dotenv.config();

const con = connection.promise();

const loginPage = (req, res) => {
    res.render('login', {title:'Login'})
};

const loginUser = async (req, res) => {
    try{
    const controlError = validationResult(req);

    const user = req.body.user;
    const password = req.body.password;

    const [result] = await con.execute('SELECT * FROM User WHERE username = ?', [user]);

    if (!controlError.isEmpty()) {
        console.log('Error de datos mal ingresados');
        return res.render('login', {
            errores: 'Error en los datos ingresados'
        });
    }

    const count = result.length;

    if (count == 0) {
        console.log('Usuario no está registrado');
        return res.render('login', {
            errores: 'El usuario no está registrado, registresé por favor'
        });
    } else {
        //USUARIO REGISTRADO
        const userPassword = result[0].password;
        const userId = result[0].idUser;

        const match = await bcrypt.compare(password, userPassword); 

        if(!match){
            return res.render('login', {
                errores: 'Password y/o usuario incorrecto'
            });
        } else {

            const token = await generarJWT(userId);

            console.log('token: ',token);

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Asegurarse de usar 'secure' en producción
                maxAge: 3600000*4 // 4 hora
            });


            res.redirect('/')
        }

    }


    } catch {
        console.log('Login Controller falló');
        return res.render('login', {
            errores: 'Error en los datos ingresados'
        })
    }
}

export {
    loginPage,
    loginUser
}