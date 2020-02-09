let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

module.exports = {index: 0, router: router};