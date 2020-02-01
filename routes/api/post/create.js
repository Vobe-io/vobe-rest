let express = require('express');
let Post = require(__bin + "/models/post.js");
let User = require(__bin + "/models/user.js");
let router = express.Router();

router.post('/api/post/create', function (req, res, next) {
    if (!req.session.loggedIn)
        return res.send({
            success: false,
            message: 'You need to be logged in to create a post'
        });

    User.isEmailVerified(req.user._id, (verified) => {
        if (verified) {
            let post = JSON.parse(req.body.post);

            Post.create({

        owner: req.user._id,
        parent: post.parent,
        text: post.text

            }, function (err, p) {
                if (err)
                    return next(err);

                res.send({
                    success: true,
                    post: p
                });
            });
        }
        else {
            return res.send({
                success: false,
                message: 'Your account must be verified'
            });
        }
    });
});

module.exports = {index: 0, router: router};