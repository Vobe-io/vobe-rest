let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/:username', async function (req, res, next) {
    res.render('profile', {user: req.user});
});

module.exports = {index: 1, router: router};