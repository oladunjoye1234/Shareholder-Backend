const mongoose = require('mongoose');
const ReportSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    file_url: String,
    created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Report', ReportSchema);