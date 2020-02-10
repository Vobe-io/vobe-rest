let express = require('express');
let Post = require(__bin + '/models/post.js');
let User = require(__bin + '/models/user.js');
let xssFilters = require('xss-filters');
let PostHandler = require(__bin + '/lib/PostHandler');
let router = express.Router();

const rateLimiter = require(__bin + '/lib/rateLimiter');

let rateLimit = rateLimiter.RateLimit({
    windowMs: 30 * 1000, // 30 seconds window
    max: 5, // start blocking after 5 requests
    message: "Too many posts created from this IP, please try again in a minute"
});

router.post('/api/post/create', rateLimit, function (req, res, next) {
    if (!req.session.loggedIn)
        return res.status(401).send({error: 'You need to be logged in to create a post'});
    User.isEmailVerified(req.user._id, (verified) => {
        if (verified) {
            let post = JSON.parse(req.body.post);

            if(!PostHandler.checkLength(post.text)) return res.status(403).send({error: 'Post to long'});

            Post.create({

                owner: req.user._id,
                parent: post.parent,
                text: PostHandler.parse(xssFilters.inHTMLData(post.text))

            }, async function (err, p) {
                if (err)
                    return next(err);
                
                let posts = await Post
                    .aggregate()
                    .match({
                        _id: p._id
                    })
                    .lookup({
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "owner"
                    })
                    .unwind({
                        path: '$owner'
                    })
                    .lookup({
                        from: 'posts',
                        localField: '_id',
                        foreignField: 'parent',
                        as: 'children'
                    })
                    .sort({date: -1})
                    .limit(1);

                if(posts.length < 1)
                    return res.next();

                res.render('snippets/post', {
                    user: req.user,
                    post: posts[0],
                    modules: {
                        moment: require('moment')
                    }
                });
            });
        } else return res.status(401).send({error: 'Your account must be verified'});
    });
});

module.exports = {index: 0, router: router};