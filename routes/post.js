let express = require('express');
let router = express.Router();
let Post = require(__models + '/post.js');
let bson = require('bson');
let response = require(__bin + '/lib/Response');

router.post('/v', async function (req, res, next) {

    try {
        let posts = await Post.getRichPost([{
            $match: {_id: bson.ObjectId.createFromHexString(req.body.postId)}
        }, {
            $limit: 1
        }]);
        res.status(200).send(response(posts, ''));
    } catch (e) {
        res.status(400).send(response('', 'Invalid post ID'));
    }
});

module.exports = {
    index: 0,
    router: router
};
