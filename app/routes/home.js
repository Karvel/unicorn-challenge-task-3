'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.use(function(req, res, next) {
  if (!req.session || !req.session.passport || !req.session.passport.user) {
    //they are not logged in
    res.redirect('/users/login');  
  } else {
    next(); 
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
