let express = require('express');
let User = require(__bin + "/models/user.js");
let Verification = require(__bin + "/models/verification.js");
let router = express.Router();

router.get('/verification', function (req, res, next) {
    User
        .find({email: req.query.email})
        .limit(1)
        .lean()
        .exec(async function (err, userData) {
            if (err || userData[0] === undefined) res.render('verification', {message: 'Sorry, your verification link is not valid &#128543;'});
            else
                Verification
                    .find({token: req.query.token, email: req.query.email})
                    .limit(1)
                    .lean()
                    .exec(async function (err, verification) {
                        if (err || verification.length === 0 || userData[0] === undefined) res.render('verification', {message: 'Sorry, your verification link is not valid &#128543;'});
                        else if (userData[0].emailVerified) res.render('verification', {message: 'Your account is already verified &#128517;'});
                        else
                            User
                                .find({email: req.query.email})
                                .limit(1)
                                .updateOne({emailVerified: true})
                                .exec(async function (err, userData) {
                                    if (err) res.render('verification', {message: 'Something went wrong while verifying you &#128543;'});
                                    else res.render('verification', {message: 'Congratulations your account has been verified &#127881;'});
                                });
                    });
        });
});

router.post('/api/auth/verification', function (req, res, next) {
    User
        .find({email: req.body.email})
        .limit(1)
        .lean()
        .exec(async function (err, userData) {
            if (err || userData[0] === undefined) res.send({success: false, message: 'Sorry, your verification link is not valid &#128543;'});
            else
                Verification
                    .find({token: req.body.token, email: req.body.email})
                    .limit(1)
                    .lean()
                    .exec(async function (err, verification) {
                        if (err || verification.length === 0 || userData[0] === undefined) res.send({success: false, message: 'Sorry, your verification link is not valid &#128543;'});
                        else if (userData[0].emailVerified) res.send({success: false, message: 'Your account is already verified &#128517;'});
                        else
                            User
                                .find({email: req.body.email})
                                .limit(1)
                                .updateOne({emailVerified: true})
                                .exec(async function (err, userData) {
                                    if (err) res.send({success: false, message: 'Something went wrong while verifying you &#128543;'});
                                    else res.send({success: true, message: 'Congratulations your account has been verified &#127881;'});
                                });
                    });
        });
});
module.exports = {index: 0, router: router};
