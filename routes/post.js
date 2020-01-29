let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/v/:postID', function (req, res, next) {
    res.render('post', {postID: req.params.postID});
});

module.exports = {index: 0, router: router};