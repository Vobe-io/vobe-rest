let express = require('express');
let router = express.Router();
let User = require(__models + '/user.js');

/* GET home page. */
router.get('/:username', async function (req, res, next) {
    res.render('profile', {username: req.params.username});
});

module.exports = {index: 1, router: router};