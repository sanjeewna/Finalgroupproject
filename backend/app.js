var express = require('express');
var cors = require('cors');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb+srv://project:cp69uW4lFLeEU19M@atlascluster.7klsbmj.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoDB);

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var index = require('./routes/index');
var orders = require('./routes/orders');
var user = require('./routes/user');
var city = require('./routes/city');
var state = require('./routes/state');
var country = require('./routes/country');
var role = require('./routes/role');
var category = require('./routes/category');
var month = require('./routes/month');
var product = require('./routes/product');
var sell = require('./routes/sell');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended:true}));


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
/// Setting up the headers ///

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/', index);
app.use('/api/orders', orders);
app.use('/api/cities', city);
app.use('/api/countries', country);
app.use('/api/states', state);
app.use('/api/roles', role);
app.use('/api/users', user);
app.use('/api/category', category);
app.use('/api/sells', sell);
app.use('/api/months', month);
app.use('/api/products', product);

// Serving static content 
app.use('/uploads', express.static(__dirname + '/uploads'));


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
  res.render('error');
});

module.exports = app;
