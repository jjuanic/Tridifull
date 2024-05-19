import { validationResult } from "express-validator";
import connection from '../models/config.js';
import bcrypt from "bcryptjs";
import generarJWT from '../middlewares/generarJWT.js';
import UserDTO from '../models/UserDTO.js'
import { checkIfUserExists, insertUser } from "../services/userService.js";

const con = connection.promise();

const signUpPage = (req, res) => {
    res.render('signup', {user: false, title: 'Sign Up'});
};

const signUpUser = async (req, res) => {
    try {
        // Validación 
        const controlError = validationResult(req);

        if (!controlError.isEmpty()) {
            const listaErrores = controlError.errors.map(error => error.msg).join(' and ');
            return res.render('signup', {
                errores: listaErrores
            });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Crear un nuevo objeto UsuarioDTO con la contraseña encriptada
        const creationDate = new Date();
        const userDTO = new UserDTO(req.body.user, req.body.email, hashedPassword, creationDate);
        console.log(userDTO);

        // Consulta SQL para verificar si el usuario ya existe
        const userExists = await checkIfUserExists(userDTO);

        // Validar si el usuario ya está registrado
        if (userExists) {
            console.log('The user already exists');
            return res.render('signup', {
                errores: 'The user already exists'
            });
        }

        // Insertar el nuevo usuario en la base de datos
        await insertUser(userDTO);

        console.log('The account was created successfully');
        return res.render('login', { user: true, title: 'Login' });
    } catch (error) {
        console.error('Error al insertar los datos:', error);
        return res.render('signup', {
            errores: 'There was an error in the inputs'
        });
    }
};



export {
    signUpPage,
    signUpUser
};
