let mongoose = require('mongoose');
let bson = require('bson');

let VoteSchema = new mongoose.Schema({
    postId: {
        type: bson.ObjectId,
        required: true
    },
    userId: {
        type: bson.ObjectId,
        required: true
    },
    user: {
        type: bson.ObjectId,
        required: true
    },
    vote: {
        type: String,
        enum: ['up', 'down'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('votes', VoteSchema);