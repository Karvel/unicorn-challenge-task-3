'use strict';

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let User = mongoose.model('User');
let passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', (req, res, next) => {
  res.render('login'); 
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  res.redirect('/users/login');
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.redirect('/home');
});

router.get('/details', (req, res, next) => {
  res.json(req.session.passport.user);
});

router.get('/register', (req, res, next) => {
  res.render('register'); 
});

router.post('/register', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then(() => res.redirect('/users/login'));
});

module.exports = router;
