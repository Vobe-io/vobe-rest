let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/login', function (req, res, next) {
    console.log(req.user);
    res.render('login', {title: process.env.web_name || 'test', user: req.user});
});

module.exports = router;
