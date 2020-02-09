let express = require('express');
let router = express.Router();

let Post = require(__models + '/post.js');

/* GET home page. */
router.get('/', async function (req, res, next) {

    let posts = await Post.getRichPost();

    res.render('index', {
        title: process.env.web_name || 'index',
        posts: posts,
        modules: {
            moment: require('moment')
        },
        user: req.user
    });
});

module.exports = {index: 0, router: router};