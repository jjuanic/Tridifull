var express = require('express');
var router = express.Router();

const {
    loginPage,
    loginUser,
} = require('../controllers/loginController')

const {
    signUpPage,
    signUpUser
} = require('../controllers/signUpController')

/* GET home page. */
router.get('/', loginPage);
router.post('/loginuser', loginUser);

router.get('/signup',signUpPage);
router.post('/signup',signUpUser)


module.exports = router;