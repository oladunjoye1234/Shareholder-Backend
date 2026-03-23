const mongoose = require('mongoose');
// const { default: type } = require('p5/type');
const ShareholderSchema = new mongoose.Schema({
    name:  {
    type: String, 
    required: true,
    trim : true,
    },
    email: { type: String, unique: true, required: true },
    phone: String,
    role: String,
    created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Shareholder', ShareholderSchema);