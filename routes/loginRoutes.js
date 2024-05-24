const express = require('express');
const path = require('path');
const ejs = require('ejs');

const router = express.Router();

const bodyParser = require('body-parser');

const UserController = require('../controllers/loginController');
const AuthController = require('../controllers/authController');


router.get('/register', UserController.loadlogin);

// router.get('/' , (req, res) =>{
//     res.render('index');
// });


router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get('/logout',UserController.logout);


module.exports = router;
