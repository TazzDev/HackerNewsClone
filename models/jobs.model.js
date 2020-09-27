const mongoose = require('mongoose');

const JobsSchema = mongoose.Schema({
    title: String,
    expired: Boolean,
    url: String,
date: { type: Date, default: Date.now } });

module.exports = mongoose.model('Jobs', JobsSchema);