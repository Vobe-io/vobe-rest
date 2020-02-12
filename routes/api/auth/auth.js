let express = require('express');
let router = express.Router();

router.post('/api/auth/auth', async function (req, res, next) {
    res.send({
        user: req.user
    });
});

module.exports = {index: 0, router: router};
