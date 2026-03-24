const Report = require('../models/Report');
const Shareholder = require('../models/Shareholder');
const nodemailer = require('nodemailer');



exports.uploadReport = async (req, res) => {
    try {
        const { title, description } = req.body;
        const fileUrl = req.file.filename;

        // 1. Save report to MongoDB
        const report = new Report({ title, description, file_url: fileUrl });
        await report.save();

        // 2. Fetch all shareholder emails
        const shareholders = await Shareholder.find({}, 'email');
        const emailList = shareholders.map(s => s.email);

        // 3. Setup Email Transporter (Use your real credentials here)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user:process.env.APP_EMAIL, pass: process.env.APP_PASSWORD }
        });

        // 4. Send Emails (Logic for multiple recipients)
        if (emailList.length > 0) {
            const mailOptions = {
                from: '"SmartPay Hub" <admin@email.com>',
                to: emailList,
                subject: 'New Financial Report Available',
                text: `A new report titled "${title}" has been uploaded.`,
                attachments: [{ filename: fileUrl, path: `./uploads/${fileUrl}` }]
            };
            await transporter.sendMail(mailOptions);
        }

        res.json({ message: 'Report saved and emails sent to ' + emailList.length + ' investors' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getReports = async (req, res) => {
    try {   
        const reports = await Report.find().sort({ created_at: -1 });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.downloadReport = async (req, res) => {
    try {
        const reportId = req.params.id;
        const report = await Report.findById(reportId);
        if (!report) return res.status(404).json({ error: 'Report not found' });
        res.download(`./uploads/${report.file_url}`, report.file_url);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }   
};

exports.deleteReport = async (req, res) => {
    try {
        const reportId = req.params.id;
        const report = await Report.findByIdAndDelete(reportId);
        if (!report) return res.status(404).json({ error: 'Report not found' });
        res.json({ message: 'Report deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
