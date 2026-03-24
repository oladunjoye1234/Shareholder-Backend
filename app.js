const express = require('express');
const cors = require('cors');
const multer = require('multer');
const connectDB = require('./config/connectToDb');
const Shareholder = require('./models/Shareholder');
const Report = require('./models/Report');

const path = require('path');
require('dotenv').config();

const app = express();
connectDB(); // Initialize MongoDB Connection

app.use(cors());
app.use(express.json());

const ShareHolderRoutes = require('./routes/shareholder');
const ReportRoutes = require('./routes/Reports');


app.use('/api/shareholders', ShareHolderRoutes);
app.use('/api/reports', ReportRoutes);

// ... (Keep your multer and transporter config from before) ...

// ROUTE: Upload Report
app.post('/upload-report', upload.single('file'), async (req, res) => {
    try {
        const { title, description } = req.body;
        const file = req.file.filename;

        // Save to MongoDB
        const newReport = new Report({ title, description, file_url: file });
        await newReport.save();

        // Get all emails
        const shareholders = await Shareholder.find({}, 'email');
        
        // ... (Keep your nodemailer loop here) ...

        res.json({ message: 'Report uploaded and distributed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => console.log('Server running on port 5000'));