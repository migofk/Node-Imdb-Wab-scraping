var express = require('express');
var router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware')
const { getUserData } = require('../controllers/userController')
/* GET users listing. */
router.get('/getUserData', authMiddleware, getUserData);

module.exports = router;
