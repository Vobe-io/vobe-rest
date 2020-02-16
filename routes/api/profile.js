let express = require('express');
let User = require(__bin + "/models/user.js");
let router = express.Router();
let response = require(__bin + '/lib/Response');

router.post('/api/profile', async function (req, res, next) {

    res.status(200).send(response((
        await User
            .aggregate()
            .match({
                username: req.body.username
            })
            .project({
                password: 0,
                emailVerified: 0,
                email: 0
            }))[0], ''
    ));
});

module.exports = {index: 1, router: router};
