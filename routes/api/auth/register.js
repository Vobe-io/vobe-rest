let express = require('express');
let crypto = require('crypto-random-string');
let User = require(__bin + "/models/user.js");
let Verification = require(__bin + "/models/verification.js");

const rateLimiter = require(__bin + '/lib/rateLimiter');

let router = express.Router();

let {isEmailBurner} = require('burner-email-providers');

let sg = require('@sendgrid/mail');
sg.setApiKey(process.env.SENDGRID_API_KEY);


let rateLimit = rateLimiter.RateLimit({
    windowMs: 30 * 60 * 1000, // 30 minutes window
    max: 5, // start blocking after 5 requests
    message: "Too many accounts created from this IP"
});

/* GET home page. */
router.post('/api/auth/register', rateLimit, function (req, res, next) {
        if (req.body.email &&
            req.body.username &&
            req.body.password) {

            if (isEmailBurner(req.body.email))
                return res.send({
                    success: true,
                    message: 'Just one more step: We have send an email to <b>' + req.body.email + '</b> please check your spam folder'
                });

            let userData = {
                email: req.body.email,
                username: req.body.username,
                displayName: req.body.username,
                password: req.body.password,
                emailVerified: process.env.DEBUG
            };

            let email_validation = new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])");
            if (!email_validation.test(userData.email))
                return res.send({
                    success: false,
                    message: 'Wrong email format'
                });
            let username_validation = new RegExp("^[a-zA-Z0-9]([._](?![._])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$");
            if (!username_validation.test(userData.username))
                return res.send({
                    success: false,
                    message: 'Wrong username format'
                });

            //use schema.create to insert data into the db
            User.create(userData, function (err, user) {
                if (err)
                    return res.send({
                        success: false,
                        message: 'Email, or username already exists'
                    });
                if (!user.emailVerified) {
                    const token = crypto({length: 255});
                    Verification.create(
                        {
                            email: userData.email,
                            token: token
                        },
                        function (err, verification) {
                            const msg = {
                                to: userData.email,
                                from: 'verification@vobe.io',
                                subject: 'Verify Your Email',
                                text: `Click on this link to verify your email https://vobe.io/verification/${token}/${user.email}`,
                                html: `Click on this link to verify your email <a href="https://vobe.io/verification/${token}/${user.email}">Click here</a>`
                            };
                            sg.send(msg);
                            if (err) {
                                console.log('true');
                                return res.send({
                                    success: false,
                                    message: err.message
                                });
                            }
                            return res.send({
                                success: true,
                                message: 'Just one more step: We have send an email to <b>' + userData.email + '</b> please check your spam folder'
                            });
                        }
                    );
                }

            });
        }
    }
)
;

module.exports = {index: 0, router: router};
