let express = require('express');
let router = express.Router();
let Post = require(__models + '/post.js');
let bson = require('bson');
let response = require(__bin + '/lib/Response');

router.post('/v', async function (req, res, next) {

    let isHex = /[0-9A-Fa-f]{6}/g;
    let posts = '';
    if (isHex.test(req.body.postId))
        posts = await Post.getRichPost([{
            $match: {_id: bson.ObjectId.createFromHexString(req.body.postId)}
        }, {
            $limit: 1
        }]);

    else return res.status(400).send(response('', 'Invalid post ID'));
    res.status(200).send(response(posts, ''));
});

module.exports = {
    index: 0,
    router: router
};
