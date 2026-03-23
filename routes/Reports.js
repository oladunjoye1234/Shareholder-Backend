const express = require('express');
const router = express.Router();
const reportCtrl = require('../controllers/Report');
const upload = require('../middlewares/upload');
const UploadReport = require('../controllers/Report');
// PATH: /api/reports
// Note: 'file' must match the name attribute in your frontend form/data

router.post('/upload', upload.single('file'), UploadReport.uploadReport);

router.get('/archive', async (req, res) => {
    // We can also define simple logic directly in routes if needed, 
    // but usually, we'd call reportCtrl.getReports
    const Report = require('../models/Report');
    const reports = await Report.find().sort({ created_at: -1 });
    res.json(reports);
});

module.exports = router;