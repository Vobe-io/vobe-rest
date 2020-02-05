let RateLimitMongoStore = require('rate-limit-mongo');
let RateLimit = require('express-rate-limit');

const rateLimiter = () => {

    let store = new RateLimitMongoStore({
        uri: __vobe.mongodb.uri,
        collectionName: 'expressRateRecords'
    });

    this.RateLimit = (obj = {}) =>
        new RateLimit(Object.assign({
            store: store,
            max: 100,
            windowMs: 15 * 60 * 1000
        }, obj));

    return this;
};

module.exports = rateLimiter();