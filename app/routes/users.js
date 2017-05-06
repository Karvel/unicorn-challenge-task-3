'use strict';

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let User = mongoose.model('User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', (req, res, next) => {
  res.render('login'); 
});

router.get('/register', (req, res, next) => {
  res.render('register'); 
});

module.exports = router;
