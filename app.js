var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let shopsRouter = require("./routes/shops");
let loginRouter = require("./routes/login")

let tokenVerify = require("./middlewares/tokenHandle")

let sequelize = require("./middlewares/database")
const User = require("./models/user")

async function testingConnectDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log(User === sequelize.models.User)
        sequelize.sync()//สร้างdatabase


        const users = await User.findAll();
        console.log(("--*--").repeat(20)) //เขียนซ้ำกัน 20 รอบ
        //console.log(users)
        //console.log('All users:', JSON.stringify(users, null, 2));

        /*for (let data of users) {
            console.log(data.dataValues)
            
        }*/

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
testingConnectDatabase()

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = '1235';

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        console.log(hash)
    });
});

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

