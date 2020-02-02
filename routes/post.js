let express = require('express');
let router = express.Router();
let Post = require(__models + '/post.js');
let ObjectId = require('mongodb').ObjectID;

/* GET home page. */
router.get('/v/:postID', async function (req, res, next) {
    let posts = await Post.aggregate([{
        $match: {
            _id: ObjectId(req.params.postID)
        }
    }, {
        $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "ownerData"
        }
    }, {
        $unwind: {
            path: '$ownerData'
        }
    }, {
        $lookup: {
            from: 'posts',
            localField: '_id',
            foreignField: 'parent',
            as: 'children'
        }
    }])
        .sort({date: -1})
        .limit(20);

    res.render('post', {posts: posts});
});

module.exports = {
    index: 0,
    router: router,
    modules: {
        moment: require('moment')
    }
};