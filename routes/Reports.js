const express = require('express');
const router = express.Router();
const reportCtrl = require('../controllers/Report');
const upload = require('../middlewares/upload');
const UploadReport = require('../controllers/Report');
const GetReports = require('../controllers/Report');
const DownloadReport = require('../controllers/Report');
const DeleteReport = require('../controllers/Report');
// PATH: /api/reports
// Note: 'file' must match the name attribute in your frontend form/data



    router.route("/all-reports").get(GetReports.getReports);
    router.route("/upload") .post(upload.single('file'), UploadReport.uploadReport);
    router.route("/download/:id").get(DownloadReport.downloadReport);
    router.route("/delete/:id").delete(DeleteReport.deleteReport);
module.exports = router;