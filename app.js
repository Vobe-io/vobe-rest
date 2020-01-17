let fs = require("fs");
let debug = require('debug')('vobe:server');

let express = require('express');

// EXPRESS MIDDLEWARE
let createError = require('http-errors');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let sassMiddleware = require('node-sass-middleware');

let app = express();

// MONGODB
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');


// libs
const secretManager = require('./bin/lib/secretManager');


/*

 /$$    /$$          /$$                     /$$
| $$   | $$         | $$                    |__/
| $$   | $$ /$$$$$$ | $$$$$$$   /$$$$$$      /$$  /$$$$$$
|  $$ / $$//$$__  $$| $$__  $$ /$$__  $$    | $$ /$$__  $$
 \  $$ $$/| $$  \ $$| $$  \ $$| $$$$$$$$    | $$| $$  \ $$
  \  $$$/ | $$  | $$| $$  | $$| $$_____/    | $$| $$  | $$
   \  $/  |  $$$$$$/| $$$$$$$/|  $$$$$$$ /$$| $$|  $$$$$$/
    \_/    \______/ |_______/  \_______/|__/|__/ \______/

                                                          */

const secrets = secretManager({
    createFile: true,
    generateNew: true
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

debug('Environment variables:');
Object.keys(process.env).forEach(key => debug(' ' + key + '\t\t->\t' + process.env[key]));

mongoose.connect('mongodb://vobe_mongo:27017/vobe');

app.use(session({
    secret: process.env.session_secret || secrets.get('web_session'),
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'sessions'
    })
}));

app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));

app.use(express.static(path.join(__dirname, 'public')));


// LOAD ROUTES OUT OF /routes
fs.readdirSync(path.join(__dirname, 'routes'), {withFileTypes: true, encoding: "utf-8"}).forEach(f => {
    if (f.name !== undefined && f.name.endsWith(".js")) {
        try {
            app.use(require(path.join(__dirname, 'routes', f.name)));
            console.log('Loaded Route : ' + f.name);
        } catch (e) {
            debug(`Couldn't load route: ` + f.name)
        }
    }
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
