const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.get('/get-purchasing', (req, res) => {
    connection.query('SELECT * FROM purchasing order by id_pembelian desc', (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching purchasing: ' + err.message });
        }
        return res.status(200).json({ message: 'Purchasing fetched successfully', data: rows });
    });
});


router.post('/create-purchasing', (req, res) => {
    const { id_pembelian = 0, id_produk = 0, jumlah = 0, harga_beli = 0, status = 0 } = req.body;
    connection.query('INSERT INTO purchasing (id_pembelian, id_produk, jumlah, harga_beli, status) VALUES (?, ?, ?, ?, ?)', [id_pembelian, id_produk, jumlah, harga_beli, status], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating purchasing: ' + err.message });
        }
    });

    connection.query('UPDATE product_stock SET stok = stok - ? WHERE id_produk = ?', [jumlah, id_produk], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating product stock: ' + err.message + ' id_produk: ' + id_produk });
        }
    });
    
    connection.query('SELECT stok FROM product_stock WHERE id_produk = ?', [id_produk], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching id_stok: ' + err.message });
        }
    });

    const joinSql = `SELECT MAX(p.id_pembelian) AS id_pembelian, p.id_produk, p.jumlah, p.harga_beli, p.status, s.stok AS current_stok FROM purchasing p JOIN product_stock s ON p.id_produk = s.id_produk WHERE p.id_produk = ?`;
    connection.query(joinSql, [id_produk], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching join sql: ' + err.message });
        }
        return res.status(200).json({ message: 'Purchasing created successfully', data: result[0] });
    });
});

router.put('/update-purchasing/:id_pembelian', (req, res) => {
    const { id_pembelian } = req.params;
    const { id_produk = 0, jumlah = 0, harga_beli = 0, status = 0 } = req.body;

    connection.query('UPDATE purchasing SET id_pembelian = ?, id_produk = ?, jumlah = ?, harga_beli = ?, status = ? WHERE id_pembelian = ?', [id_pembelian, id_produk, jumlah, harga_beli, status, id_pembelian], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating purchasing: ' + err.message + ' id_pembelian: ' + id_pembelian });
        }
        res.status(200).json({ message: 'Purchasing updated successfully', data: req.body });
    });
});

router.delete('/delete-purchasing/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM purchasing WHERE id_pembelian = ?', [id_pembelian], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting purchasing' });
        }
        res.status(200).json({ message: 'Purchasing deleted successfully', data: req.body });
    });
});

router.get('/get-purchasing-by-id/:id_pembelian', (req, res) => {
    const { id_pembelian } = req.params;
    connection.query('SELECT * FROM purchasing WHERE id_pembelian = ?', [id_pembelian], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching purchasing by id: ' + err.message + ' id_pembelian: ' + id_pembelian });
        }
        res.status(200).json({ message: 'Purchasing fetched successfully', data: result });
    });
});

router.get('/get-cancel-purchasing', (req, res) => {
    connection.query('SELECT * FROM purchasing WHERE status = 2', (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching canceling purchasing: ' + err.message });
        }
        res.status(200).json({ message: 'Cancel purchasing fetched successfully', data: result });
    });
});
router.put('/update-cancel-purchasing/:id_pembelian', (req, res) => {
    const { id_pembelian } = req.params;
    const { status = 2 } = req.body;
    connection.query('UPDATE purchasing SET status = ? WHERE id_pembelian = ?', [status, id_pembelian], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating status canceling purchasing: ' + err.message + ' id_pembelian: ' + id_pembelian });
        }
        res.status(200).json({ message: 'Purchasing updated status canceling purchasing successfully', data: req.body });
    });
});

module.exports = router;