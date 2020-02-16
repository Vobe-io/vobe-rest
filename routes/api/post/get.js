let express = require('express');
let router = express.Router();
let Post = require(__models + '/post.js');

let response = require(__bin + '/lib/Response');

/* GET home page. */
router.get('/api/post/get', async function (req, res, next) {
    let posts = await Post.getRichPost();
    res.status(200).send(response(posts));
});

module.exports = {index: 0, router: router};
