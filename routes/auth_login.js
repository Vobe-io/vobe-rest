let express = require('express');
let User = require("./../bin/models/user.js");
let router = express.Router();

/* GET home page. */
router.post('/auth/login', function (req, res, next) {
    console.log(req.body);
    if (req.body.username && req.body.password) {

        let loginData = {
            username: req.body.username,
            password: req.body.password
        };

        User.authenticate(loginData.username, loginData.password, (err, user) => {
            if (err) return next(err);

            req.session.userId = user._id;
            req.session.loggedIn = true;

            res.redirect('/');
        });

    }
});

module.exports = router;
