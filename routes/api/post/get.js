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

                const loadChildren = async (post, walk) => {
                    let children = await Post
                        .find({parent: post._id})
                        .limit(20) // REMOVE LATER WITH LAZY LOAD
                        .sort({date: -1})
                        .lean();

                    for (const c of children) {
                        c.ownerData = {name: (await getOwner(c)).username};
                        if (walk > 0)
                            c.children = await loadChildren(c, walk - 1);
                    }

                    return children;
                };

                post.children = await loadChildren(post, 10);
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