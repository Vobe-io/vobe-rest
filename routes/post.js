let express = require('express');
let router = express.Router();
let Post = require(__models + '/post.js');
let bson = require('bson');

router.post('/v', async function (req, res, next) {

    let isHex = /[0-9A-Fa-f]{6}/g;
    let posts = '';
    if (isHex.test(req.body.postId))
        posts = await Post.getRichPost([{
            $match: {_id: bson.ObjectId.createFromHexString(req.body.postId)}
        }, {
            $limit: 1
        }]);

    else return res.send({
        success: false,
        message: 'Invalid post ID'
    });
    return res.send({
        success: true,
        posts: posts
    });
});



module.exports = {
    index: 0,
    router: router
};
