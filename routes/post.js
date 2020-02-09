let express = require('express');
let router = express.Router();
let Post = require(__models + '/post.js');
let ObjectId = require('mongodb').ObjectID;

/* GET home page. */
router.get('/v/:postID', async function (req, res, next) {

    let posts = await Post.getRichPost(1);

    res.render('post', {
        posts: posts,
        modules: {
            moment: require('moment')
        },
        user: req.user
    });
});

module.exports = {
    index: 0,
    router: router
};