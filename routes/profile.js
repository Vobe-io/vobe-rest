let express = require('express');
let router = express.Router();
let User = require(__models + '/user.js');

/* GET home page. */
router.get('/:username', async function (req, res, next) {
    let user = await User.findOne({username: req.params.username});
    res.render('profile', {user: user});
});

module.exports = {index: 1, router: router};