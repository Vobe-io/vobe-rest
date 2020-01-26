let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: process.env.web_name || 'index', user: req.user});
});

module.exports = {index: 0, router: router};