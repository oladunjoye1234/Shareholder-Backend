const mongoose = require('mongoose');
const ShareholderSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true },
    phone: String,
    role: String,
    created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Shareholder', ShareholderSchema);