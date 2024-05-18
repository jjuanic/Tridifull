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
    check('user').isLength(3).withMessage('The username is not valid'),
    check('password').isLength({min: 8}).withMessage('The password has to contain at least 8 caracters')
]
,loginUser);

router.get('/signup',signUpPage);
router.post('/signup', [
    check('user').isLength({min: 3}).withMessage('The username has to contain at least 3 caracters'),
    check('email').isEmail().withMessage('The email format is not valid'),
    check('password').isLength({min: 8}).withMessage('The password has to contain at least 8 caracters')
], signUpUser);


export default router;