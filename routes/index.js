let express = require('express');
let router = express.Router();

let User = require(__models + '/user.js');
let Post = require(__models + '/post.js');

/* GET home page. */
router.get('/', async function (req, res, next) {

    let posts = await Post.aggregate([{
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

    res.render('index', {
        title: process.env.web_name || 'index',
        posts: posts,
        user: req.user
    });
});

module.exports = {index: 0, router: router};