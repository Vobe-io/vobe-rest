let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/:username', function (req, res, next) {
    res.render('profile', {username: req.params.username});
});

module.exports = {index: 1, router: router};