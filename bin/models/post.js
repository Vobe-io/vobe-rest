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


    text: {
        type: String,
        required: true
    }
});

//authenticate input against database
/*PostSchema.statics.getParent = () => {
    console.log(this);
    this.find({_id: this.parent});
};*/


let Post = mongoose.model('post', PostSchema);
module.exports = Post;