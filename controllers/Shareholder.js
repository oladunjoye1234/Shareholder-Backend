const Shareholder = require('../models/Shareholder');

// Add a new shareholder
exports.addShareholder = async (req, res) => {
    try {
        const { name, email, phone, role } = req.body;
        const newShareholder = new Shareholder({ name, email, phone, role });
        await newShareholder.save();
        res.status(201).json({ message: 'Shareholder registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all shareholders
exports.getAllShareholders = async (req, res) => {
    try {
        const shareholders = await Shareholder.find();
        res.json(shareholders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

