let express = require('express');
let router = express.Router();
let Post = require('./../bin/models/post.js');
let User = require('./../bin/models/user.js');
let bson = require('bson');

/* GET home page. */
router.get('/debug', function (req, res, next) {
    let out;

    let id = new bson.ObjectId();

    const errorHandle = () => res.send(out ? Post : '[NOT DEFINED]');
        if (err) return errorHandle();

        console.log(owner);

        Post.create({
            _id: id,
            owner: owner._id
        }, function (err, post) {
            if (err)
                return errorHandle();
            else
                return res.status(200).send({
                    success: true,
                    message: undefined,
                    post: post
                });

        });
});

module.exports = router;