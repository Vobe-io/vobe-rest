let express = require('express');
let router = express.Router();

let Post = require(__models + '/post.js');

/* GET home page. */
router.get('/', async function (req, res, next) {
    res.render('index', {
        title: process.env.web_name || 'index',
    });
});

router.post('/', async function (req, res, next) {
    let posts = await Post.getRichPost();
    res.send({
        posts: posts,
    });
});

module.exports = {index: 0, router: router};
