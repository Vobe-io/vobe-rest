let express = require('express');
let crypto = require('crypto-random-string');
let User = require(__bin + "/models/user.js");
let Verification = require(__bin + "/models/verification.js");
let router = express.Router();
let sg = require('@sendgrid/mail');
sg.setApiKey(process.env.SENDGRID_API_KEY);

/* GET home page. */
router.post('/api/auth/register', function (req, res, next) {
    if (req.body.email &&
        req.body.username &&
        req.body.password) {

        let userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            emailVerified: process.env.DEBUG
        };

        let email_validation = new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])");
        if (!email_validation.test(userData.email))
            return res.status(406).send({
                success: false,
                message: 'Wrong email format'
            });
        let username_validation = new RegExp("^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$");
        if (!username_validation.test(userData.username))
            return res.status(406).send({
                success: false,
                message: 'Wrong username format'
            });

        //use schema.create to insert data into the db
        User.create(userData, function (err, user) {
            if (err)
                return res.status(401).send({
                    success: false,
                    message: err.message
                });
            if (!user.emailVerified) {
                Verification.create(
                    {
                        email: userData.email,
                        token: crypto({length: 255})
                    },
                    function (err, verification) {
                        const msg = {
                            to: userData.email,
                            from: 'verification@vobe.io',
                            subject: 'Verify Your Email',
                            text: `Click on this link to verify your email https://vobe.io/verification?token=${verification.token}&email=${user.email}`,
                            html: `Click on this link to verify your email <a href="https://vobe.io/verification?token=${verification.token}&email=${user.email}">Click here</a>`
                        };
                        sg.send(msg);
                        if (err) {
                            return res.status(401).send({
                                success: false,
                                message: err.message
                            });
                        }
                    }
                );
            }

            return res.status(200).send({
                success: true,
                message: 'Just one more step: We have sand an email to ' + userData.email + ' please check your spam folder'
            });

        });
    }
});

module.exports = {index: 0, router: router};
