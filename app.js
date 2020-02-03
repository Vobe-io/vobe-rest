require('dotenv').config();
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
const User = require('./bin/models/user.js');
const clc = require('cli-color');
const Table = require('cli-table');

//global vars
global.__root = __dirname;
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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://mongo:27017/vobe', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

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
(function () {
    let table = new Table({
        head: ['PRIORITY', 'ROUTE', 'STATUS'],
        chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''}
    });
    let errors = [];
    let routes = [];

    function loadRoutes(p) {
        console.log('LOADING ' + p);
        fs.readdirSync(p, {withFileTypes: true, encoding: "utf-8"}).forEach(f => {
            if (f.isDirectory())
                loadRoutes(path.join(p, f.name));

            if (f.name !== undefined && f.name.endsWith(".js")) {
                let tData = {
                    passed: false,
                    data: undefined,
                    path: p,
                    name: f.name
                };
                try {
                    tData.data = require(path.join(p, f.name));
                    tData.passed = true;
                    routes.push(tData);
                } catch (e) {
                    errors.push(e);
                }
            }
        });
    }

    loadRoutes(path.join(__dirname, 'routes'));

    routes
        .sort((a, b) => (a.data.index ? a.data.index : 0) - (b.data.index ? b.data.index : 0))
        .forEach(r => {
            if (r.passed) {
                app.use(r.data.router ? r.data.router : r);
                table.push([r.data.index, path.join(r.path, r.name), clc.green('PASSED')]);
            } else
                table.push([r.data.index, path.join(r.path, r.name), clc.red('ERROR')]);
        });

    console.log(table.toString());
    if (errors.length > 0) console.log(clc.bold.red('\n\nENCOUNTERED ERROR(S) WHILE LOADING ROUTES:\n'));
    errors.forEach(e => console.log(clc.red(e)));
})();

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
