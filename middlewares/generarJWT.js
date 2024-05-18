
import jwt from 'jsonwebtoken';


const generarJWT = (user) => {

    return new Promise((resolve, reject) => {
        
        const payload = { user: user };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }
        });
    });

}


export default generarJWT;