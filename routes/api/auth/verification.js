let express = require('express');
let User = require(__bin + "/models/user.js");
let Verification = require(__bin + "/models/verification.js");
let router = express.Router();
let response = require(__bin + '/lib/Response');

router.post('/api/auth/verification', function (req, res, next) {
    User
        .find({email: req.body.email})
        .limit(1)
        .lean()
        .exec(async function (err, userData) {
            if (err || userData[0] === undefined) res.status(400).send(response('', 'Sorry, your verification link is not valid &#128543;'));
            else
                Verification
                    .find({token: req.body.token, email: req.body.email})
                    .limit(1)
                    .lean()
                    .exec(async function (err, verification) {
                        if (err || verification.length === 0 || userData[0] === undefined) res.status(400).send(response('', 'Sorry, your verification link is not valid &#128543;'));
                        else if (userData[0].emailVerified) res.status(403).send(response('', 'Your account is already verified &#128517;'));
                        else
                            User
                                .find({email: req.body.email})
                                .limit(1)
                                .updateOne({emailVerified: true})
                                .exec(async function (err, userData) {
                                    if (err) res.status(400).send(response('', 'Something went wrong while verifying you &#128543;'));
                                    else res.status(200).send(response('', 'Congratulations your account has been verified &#127881;'));
                                });
                    });
        });
});
module.exports = {index: 0, router: router};
