const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ShortUrlSchema = new Schema({
    fullUrl: {
        type: String,
        required: true,
    },
    shortId: {
        type: String,
        required: true,
    },
    qrCode: {
        type: String,
        require: true
    }
})

const ShortUrlModel = mongoose.model('shortUrl', ShortUrlSchema);

module.exports = ShortUrlModel