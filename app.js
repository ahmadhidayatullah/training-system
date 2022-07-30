var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
var cors = require('cors')

//require module
const authRouter = require('./app/auth/router');
const registration = require('./app/registration/router');
const skill = require('./app/skills/router');
const activity = require('./app/activities/router');

const app = express();
const URL = `/v1`;
app.use(cors());

app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// API
app.use(`${URL}/auth`, authRouter)
app.use(`${URL}/user`, registration)
app.use(`${URL}/skill`, skill)
app.use(`${URL}/activity`, activity)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).json({
        message: 'Not Found'
    })
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500).json({
        message: err.message
    })
});
module.exports = app;
