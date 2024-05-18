import { validationResult } from "express-validator";
import connection from '../models/config.js';
import bcrypt from "bcrypt";
import generarJWT from '../middlewares/generarJWT.js';
import UserDTO from '../models/UserDTO.js'

const con = connection.promise();

const signUpPage = (req, res) => {
    res.render('signup', {user: false, title: 'Sign Up'});
};

// Otros imports y código

const signUpUser = async (req, res) => {
    try {
        // Validación y otros códigos

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Crear un nuevo objeto UsuarioDTO con la contraseña encriptada
        const creationDate = new Date();
        const userDTO = new UserDTO(req.body.user, req.body.email, hashedPassword, creationDate);
        console.log(userDTO);

        // Consulta SQL para verificar si el usuario ya existe
        const [rows] = await con.execute('SELECT COUNT(*) AS count FROM User WHERE email = ? OR username = ?', [userDTO.email, userDTO.username]);
        const count = rows[0].count;

        // Validar si el usuario ya está registrado
        if (count > 0) {
            console.log('Usuario ya registrado');
            return res.render('signup', {
                errores: 'El usuario ya está registrado'
            });
        }

        // Insertar el nuevo usuario en la base de datos
        const [result] = await con.execute('INSERT INTO User SET username = ?, password = ?, email = ?, creationDate = ?', [userDTO.username, userDTO.password, userDTO.email, userDTO.creationDate]);

        console.log('Datos insertados correctamente');
        return res.render('login', { user: true, title:'Login' });
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
