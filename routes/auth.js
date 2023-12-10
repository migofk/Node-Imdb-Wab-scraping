var express = require('express');
var router = express.Router();
const User  = require('../models/user');
const {register, login} = require('../controllers/authController')
/* GET users listing. */
router.post('/register', register);
router.post('/login', login);
module.exports = router;
