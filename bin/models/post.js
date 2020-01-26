let mongoose = require('mongoose');
let bson = require('bson');

let PostSchema = new mongoose.Schema({
    owner: {
        type: bson.ObjectId,
        required: true
    },
    parent: {
        type: bson.ObjectId,
        required: false,
    },

    date: {
        type: Date,
        required: true,
        default: Date.now
    },


    text: {
        type: String,
        required: true
    }


});


let Post = mongoose.model('post', PostSchema);
module.exports = Post;