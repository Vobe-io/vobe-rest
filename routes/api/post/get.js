let express = require('express');
let Post = require(__bin + "/models/post.js");
let router = express.Router();

router.post('/api/post/get', function (req, res, next) {
    Post
        .find({})
        .limit(20)
        .exec(function (err, posts) {
            if (err)
                return res.status(500).send({
                    success: false,
                    error: err
                });
            res.send({
                success: true,
                posts: posts
            });
        });
});

module.exports = router;