const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
    title: String,
    by: String,
    url: String,
    score: Number,
    deleted: Boolean,
    comments: [{ body: String, date: Date }],
date: { type: Date, default: Date.now } });

module.exports = mongoose.model('News', NewsSchema);
