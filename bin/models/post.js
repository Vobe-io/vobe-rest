let mongoose = require('mongoose');
let bson = require('bson');
let postPipeline = require(__bin + '/pipelines/postPipeline.js');

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

PostSchema.statics.getRichPost = async function (aggs = []) {
    let aggregations = [
        {
            $match: {
                parent: null
            }
        }, {
            $sort: {
                date: -1
            }
        }, {
            $lookup: {
                from: 'users',
                localField: 'owner',
                foreignField: '_id',
                as: 'owner'
            }
        }, {
            $unwind: {
                path: '$owner'
            }
        }, {
            $lookup: {
                from: 'posts',
                as: 'children',
                localField: '_id',
                foreignField: 'parent'
            }
        }, {
            $limit: 20
        }
    ];

    aggs.forEach(agg => aggregations.push(agg));

    let post = await this.aggregate(aggregations);
    return postPipeline.process(post);
};

let Post = mongoose.model('post', PostSchema);
module.exports = Post;
