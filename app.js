var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
var db = process.env.DB;
var dB = db;
var cookieParser = require('cookie-parser');
var logger = require('morgan');

mongoose.connect(dB,  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => console.log('MongoDB Connected....'))
.catch(err => console.log(err));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const productRouter = require('./routes/product');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.listen(process.env.PORT, ()=>{
  console.log('server is up on 3000')  //printing of this line on console means the server has started
});

module.exports = app;
