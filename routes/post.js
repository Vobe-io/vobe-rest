let express = require('express');
let router = express.Router();
let Post = require(__models + '/post.js');
let bson = require('bson');

/* GET home page. */
router.get('/v/:postId', async function (req, res, next) {

    let posts = await Post.getRichPost([{
        $match: {_id: bson.ObjectId.createFromHexString(req.params.postId)}
    },{
        $limit: 1
    }]);

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