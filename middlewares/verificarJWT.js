
import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import { request, response } from 'express';

//llave secreta de la app
const secreto = process.env.SECRETORPRIVATEKEY;

// const verificarToken = (req = request, res = response, next) => {
    
//     //obtenemos el token del header 
//     //const token = req.header('x-auth-token');

//     //obtenemos el token del cookie.
//     const token = req.cookies.token;

//     console.log('==============================');
//     console.log(token);
//     console.log('==============================');


//     //si no hay token
//     if(!token){
//         return res.render('error', {
//             errores: 'No hay token'
//         });
//     }

//     try {
//         //verificamos el token
//         const payload = jwt.verify(token, secreto);

//         //si el token es válido
//         req.user = payload.user;
        
//         next();

//     } catch (error) {
//         console.log(error);
//         res.render('error', {
//             errores: 'Token no válido'
//         });
//     }
// }


const verificarToken = (req = request, res = response, next) => {
    const token = req.cookies.token;

    if (!token) {
        console.log('VerificarToken error');
        return res.redirect('/login');
    }

    try {
        const payload = jwt.verify(token, secreto);
        req.user = payload.user;
        console.log('VerificarToken funcional');
        next();
    } catch (error) {
        console.log(error);
        return res.redirect('/login');
    }
};

export default verificarToken;