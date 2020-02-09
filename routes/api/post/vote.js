let express = require('express');
let Vote = require(__bin + "/models/postVote.js");
let router = express.Router();


router.post('/api/post/vote', async (req, res, next) => {
    let User = req.user;

    if (!User) return res.status(401).send({message: 'You need to be logged in to vote for a post'});
    if (!req.body.postId) return res.status(404).send({message: 'PostId is not defined.'});

    let vote = await Vote.findOneAndUpdate({
        postId: req.body.postId,
        userId: User._id
    }, {
        vote: req.body.vote
    }, {
        new: true,
        upsert: true
    });

    res.send({success: true, vote: vote});
});

module.exports = {index: 0, router: router};