let express = require('express');
let Post = require(__bin + "/models/post.js");
let User = require(__bin + "/models/user.js");
let router = express.Router();

router.post('/api/post/get', function (req, res, next) {
    Post
        .find({})
        .sort({date: -1})
        .limit(20)
        .lean()
        .exec(async function (err, postData) {
            if (err)
                return res.status(500).send({
                    success: false,
                    error: err
                });

            let posts = [];

            for (let post of postData) {

                if (post.parent)
                    continue;

                const getOwner = (async _ => {
                    return await User
                        .findById(_.owner)
                        .lean();
                });

                let children = await Post
                    .find({parent: post._id})
                    .limit(20)
                    .sort({date: -1})
                    .lean();


                for (const c in children)
                    children[c].ownerData = {name: (await getOwner(post)).username};


                post.children = children;
                post.ownerData = {name: (await getOwner(post)).username};

                posts.push(post);
            }

            res.send({
                success: true,
                posts: posts
            });
        });
});

module.exports = {index: 0, router: router};