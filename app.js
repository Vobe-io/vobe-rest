require('dotenv').config();
let fs = require("fs");
let debug = require('debug')('vobe:server');

let express = require('express');
let cors = require('cors');

// EXPRESS MIDDLEWARE
let createError = require('http-errors');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let sassMiddleware = require('node-sass-middleware');

let app = express();
app.use(cors({origin: [
        "http://vobe.io"
    ], credentials: true}));

// MONGODB
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');


// libs
const secretManager = require('./bin/lib/secretManager');
const User = require('./bin/models/user.js');

//global vars
global.__root = __dirname;
global.__bin = path.join(__root, 'bin');
global.__models = path.join(__root, 'bin', 'models');
global.__vobe = JSON.parse(fs.readFileSync(path.join(__root, 'vobe.json'), 'utf-8'));

console.log(`
 /$$    /$$          /$$                     /$$
| $$   | $$         | $$                    |__/
| $$   | $$ /$$$$$$ | $$$$$$$   /$$$$$$      /$$  /$$$$$$
|  $$ / $$//$$__  $$| $$__  $$ /$$__  $$    | $$ /$$__  $$
 \\  $$ $$/| $$  \\ $$| $$  \\ $$| $$$$$$$$    | $$| $$  \\ $$
  \\  $$$/ | $$  | $$| $$  | $$| $$_____/    | $$| $$  | $$
   \\  $/  |  $$$$$$/| $$$$$$$/|  $$$$$$$ /$$| $$|  $$$$$$/
    \\_/    \\______/ |_______/  \\_______/|__/|__/ \\______/
`);

console.log('v-' + __vobe.version + '\n\n');


const secrets = secretManager({
    createFile: true,
    generateNew: true
});


const routeLoader = require(path.join(__bin, 'lib', 'middleware', 'routeLoader.js'));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

mongoose.set('useCreateIndex', true);
mongoose.connect(__vobe.mongodb.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('trust proxy', 1); // Needed because nodejs is behind proxy

app.use(session({
    resave: true,
    saveUninitialized: true,
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

app.all('*', async (req, res, next) => {
    if (req.session.loggedIn)
        req.user = await User.findOne({_id: req.session.userId});
    next();
});

// LOAD ROUTES OUT OF /routes
app.use(routeLoader);

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
    res.render('http/error');
});

module.exports = app;
