var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let shopsRouter = require("./routes/shops");
let loginRouter = require("./routes/login")

let tokenVerify = require("./middlewares/tokenHandle")

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', [tokenVerify], usersRouter);
app.use('/shops', shopsRouter);

app.use('/login', loginRouter);

module.exports = app;

