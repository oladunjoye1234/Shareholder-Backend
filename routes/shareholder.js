const express = require('express');
const router = express.Router();
const shareCtrl = require('../controllers/Shareholder');


// PATH: /api/shareholders

router.post('/add', shareCtrl.addShareholder);
router.get('/all', shareCtrl.getAllShareholders);

module.exports = router;