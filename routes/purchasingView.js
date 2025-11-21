const express = require('express');
const router = express.Router();
const purchasingController = require('../controllers/purchasingController');


router.get('/list', purchasingController.getPurchasing)

router.get('/create', purchasingController.createPurchasing)

router.post('/submit', purchasingController.submitPurchasing)

module.exports = router;
