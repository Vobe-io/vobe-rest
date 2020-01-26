let express = require('express');
let User = require(__bin + "/models/user.js");
let router = express.Router();

router.post('/api/profile', function (req, res, next) {
    User
        .findOne({username: req.body.username})
        .exec(function (err, user) {
            if (err)
                return res.status(500).send({
                    success: false,
                    error: err
                });
            res.send({
                success: true,
                user: user
            });
        });
});

module.exports = {index: 1, router: router};