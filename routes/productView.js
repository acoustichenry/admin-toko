const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// show product page
router.get('/list', productController.listProducts);

router.get('/edit', productController.editProducts);

router.get('/add', productController.addProducts);

router.post('/submitProduct', productController.submitProducts);

module.exports = router;
