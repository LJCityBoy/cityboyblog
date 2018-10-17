var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


var app = express();
// var DB = require('./models/db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));//视图文件目录，存放模板文件
app.set("view engine","hbs");



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    resave:true,
    saveUninitialized:false,
    secret:'cityBoy',
    cookie:{
      maxAge:1000*60*10 //过期时间设置
    }

}));
app.use(express.static(path.join(__dirname, 'public')));




//路由规划
app.use('/',require('./routes/index'));
app.use('/user:username',require('./routes/user'));
app.use('/post',require('./routes/post'));
app.use('/reg',require('./routes/reg'));
app.use('/login',require('./routes/login'));
app.use('/logout',require('./routes/logout'));



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
module.exports = app;
























