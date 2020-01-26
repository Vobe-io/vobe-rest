let express = require('express');
let Post = require(__bin + "/models/post.js");
let User = require(__bin + "/models/user.js");
let router = express.Router();

router.post('/api/post/get', function (req, res, next) {
    Post
        .find({})
        .sort({date: -1})
        .limit(20)
        .exec(async function (err, posts_) {
            if (err)
                return res.status(500).send({
                    success: false,
                    error: err
                });

            let posts = [];

            for (p in posts_) {
                let owner = await User.findById(posts_[p].owner).exec();
                posts.push(Object.assign({
                    ownerData: {
                        name: owner.username
                    }
                }, posts_[p].toObject()));
            }

            res.send({
                success: true,
                posts: posts
            });
        });
});

module.exports = {index: 0, router: router};