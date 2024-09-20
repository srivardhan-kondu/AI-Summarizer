const mongoose = require('mongoose');

const SummarySchema = new mongoose.Schema({
    originalText: {
        type: String,
        required: true
    },
    summarizedText: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Summary', SummarySchema);
