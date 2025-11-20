const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.get('/get-product', (req, res) => {
    connection.query('SELECT * FROM products', (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching products' });
        }
        res.json(rows);
    });
});

module.exports = router;