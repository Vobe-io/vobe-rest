let express = require('express');
let Post = require(__bin + "/models/post.js");
let router = express.Router();
var xss = require("xss");

router.post('/api/post/create', function (req, res, next) {
    if (req.loggedIn)
        return res.send({
            success: false,
            message: 'You need to be logged in to create a post'
        });

    let post = JSON.parse(req.body.post);

    Post.create({

        owner: req.user._id,
        parent: post.parent,
        text: xss(post.text)

    }, function (err, p) {
        if (err)
            return next(err);

        res.send({
            success: true,
            post: p
        })
    });

});

module.exports = {index: 0, router: router};