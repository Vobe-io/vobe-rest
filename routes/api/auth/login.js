let express = require('express');
let User = require(__bin + "/models/user.js");
let router = express.Router();

/* GET home page. */
router.post('/api/auth/login', function (req, res, next) {
    if (req.body.username && req.body.password) {

        let loginData = {
            username: req.body.username,
            password: req.body.password
        };

        User.authenticate(loginData.username, loginData.password, (err, user) => {
            if (err)
                return res.send({
                    success: false,
                    message: err.message
                });

            req.session.userId = user._id;
            req.session.loggedIn = true;

            res.send({
                success: true,
                message: undefined
            });
        });

    }
});

module.exports = {index: 0, router: router};
