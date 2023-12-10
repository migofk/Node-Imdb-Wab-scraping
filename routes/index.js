var express = require('express');
var router = express.Router();
var models = require('../models'); // loads index.js
var User = models.user; 
/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log(User);
  const users = await User.findAll();
  res.send(users);
});

module.exports = router;
