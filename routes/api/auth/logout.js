let express = require('express');
let router = express.Router();

/* GET home page. */
router.post('/api/auth/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return res.send('success');
            }
        });
    }
});

module.exports = {index: 0, router: router};
