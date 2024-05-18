import { validationResult } from "express-validator";
import connection from '../models/config.js';
import bcrypt from "bcrypt";
import generarJWT from '../middlewares/generarJWT.js';
import dotenv from 'dotenv';
import { selectUser } from "../services/userService.js";
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

    if (!controlError.isEmpty()) {
        console.log('Error de datos mal ingresados');
        return res.render('login', {
            errores: 'There was an error in the inputs'
        });
    }

    const userSQL = await selectUser(user);

    const count = userSQL.length;

    if (count == 0) {
        console.log('Usuario no está registrado');
        return res.render('login', {
            errores: 'This username is not registered. Please sign up'
        });
    } else {
        //USUARIO REGISTRADO
        const userPassword = userSQL[0].password;
        const userId = userSQL[0].idUser;

        const match = await bcrypt.compare(password, userPassword); 

        if(!match){
            return res.render('login', {
                errores: 'The username or password entered is not valid'
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