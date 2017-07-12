var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');


// mongodb
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


var dbURL = 'mongodb://localhost/blog';
mongoose.connect(dbURL, {
	useMongoClient: true,
  auth: {authdb:"admin"}
}, function(err) {
	if(err) {
		console.log("failed to connect mongodb");
	}else {
		console.log("connected to mongodb");
	}
});



var routers = require('./routers');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// 打印请求
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  cookie: {maxAge: 60 * 1000 * 30}, //设置过期时间
  resave: true, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'blog'
}));


app.use('/', routers);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
  	message: err.message
  });
});

module.exports = app;
