let express = require('express');
let router = express.Router();
let Post = require(__models + '/post.js');
let bson = require('bson');

/* GET home page. */
router.get('/v/:postId', async function (req, res, next) {

    let isHex = /[0-9A-Fa-f]{6}/g;
    let posts = '';
    let status = '';
    if (isHex.test(req.params.postId))
        posts = await Post.getRichPost([{
            $match: {_id: bson.ObjectId.createFromHexString(req.params.postId)}
        }, {
            $limit: 1
        }]);
    else status = 'Invalid post ID';
    res.render('post', {
        posts: posts,
        status: status,
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