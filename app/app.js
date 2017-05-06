let mongoose = require('mongoose');
let Promise = require('bluebird');

mongoose.connect(process.env.MONGO_URI);
let db = mongoose.connection;
db.on('open', () => console.log('database connected'));
mongoose.Promise = Promise;

require('./models/user');

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/home', home);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy((username, password, next) => {
  let User = mongoose.model('User');
  User.findOne({ email: username })
    .then(user => {
      if (!user) {
        next(new Error('Could not find user in database'));
      } else {
        comparePassword(password, user.password)
          .then(result => {
            if (result) {
              next(null, user);
            } else {
              next(new Error('Invalid username / password combo'));
            }
          })
          .catch(next);
      }
    })
    .catch(next);
}));
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
