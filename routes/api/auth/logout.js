let express = require('express');
let router = express.Router();
let response = require(__bin + '/lib/Response');

/* GET home page. */
router.post('/api/auth/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                res.status(200).send(response('', 'Success'));
            }
        });
    }
});

module.exports = {index: 0, router: router};
