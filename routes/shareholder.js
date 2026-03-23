const express = require('express');
const router = express.Router();
const addShareHolders = require('../controllers/Shareholder');


// PATH: /api/shareholders

router.route('/add').post(addShareHolders.addShareholder);

router.route('/all').get(addShareHolders.getAllShareholders);



module.exports = router;