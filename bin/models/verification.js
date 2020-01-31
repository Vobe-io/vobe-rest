let mongoose = require('mongoose');

let VerificationTokenSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    token: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: false
    }
});

let Verification = mongoose.model('verification', VerificationTokenSchema);
module.exports = Verification;