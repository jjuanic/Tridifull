import { Router } from 'express';
import { check } from 'express-validator';

const router = Router();

import {
    loginPage,
    loginUser,
} from '../controllers/loginController.js'

import {
    signUpPage,
    signUpUser
} from '../controllers/signUpController.js'

/* GET home page. */
router.get('/', loginPage);
router.post('/loginuser', [
    check('user').isLength(3).withMessage('El usuario no es válido'),
    check('password').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres')
]
,loginUser);

// /* GET home page. */
// router.get('/', loginPage);
// router.post('/loginuser', 
// loginUser);

router.get('/signup',signUpPage);
router.post('/signup', [
    check('user').isLength({min: 3}).withMessage('El nombre debe tener al menos 3 caracteres'),
    check('email').isEmail().withMessage('El email no es válido'),
    check('password').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres')
], signUpUser);


export default router;