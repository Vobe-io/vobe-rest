let express = require('express');
let router = express.Router();

let response = require(__bin + '/lib/Response');

router.post('/api/auth/auth', async function (req, res, next) {
    res.status(200).send(response(req.user));
});

module.exports = {index: 0, router: router};
