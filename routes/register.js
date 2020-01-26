let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/register', function (req, res, next) {
    res.render('register');
});

module.exports = router;