let express = require('express');
let User = require(__bin + "/models/user.js");
let router = express.Router();

router.post('/api/profile', async function (req, res, next) {
    res.send(
        await User
            .aggregate()
            .match({
                username: req.body.username
            })
            .project({
                password: 0,
                emailVerified: 0,
                email: 0
            })
    );
});

module.exports = {index: 1, router: router};