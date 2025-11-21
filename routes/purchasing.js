const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.get('/get-purchasing', (req, res) => {
    connection.query('SELECT p.id_pembelian, p.harga_beli, p.tanggal, p.jumlah, p.status, p.tanggal_batal_pembelian, s.nama_produk, s.kategori FROM purchasing p JOIN product s ON p.id_produk = s.id_produk order by p.id_pembelian desc', (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching purchasing: ' + err.message }); s
        }
        return res.status(200).json({ message: 'Purchasing fetched successfully', data: rows });
    });
});


router.post('/create-purchasing', (req, res) => {
    const { id_produk = 0, jumlah = 0, harga_beli = 0, status = 1 } = req.body; // status = 2 adalah dibeli
    connection.query('INSERT INTO purchasing (id_produk, jumlah, harga_beli, status) VALUES (?, ?, ?, ?)', [id_produk, jumlah, harga_beli, status], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating purchasing: ' + err.message });
        }
    });

    connection.query('UPDATE product_stock SET stok = stok - ? WHERE id_produk = ?', [jumlah, id_produk], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating product stock: ' + err.message + ' id_produk: ' + id_produk });
        }

    });


    const joinSql = `SELECT p.id_pembelian, p.id_produk, p.jumlah, p.harga_beli, p.status, s.stok AS stok_tersisa FROM purchasing p JOIN product_stock s ON p.id_produk = s.id_produk WHERE p.id_produk = ? order by p.id_pembelian desc`;
    connection.query(joinSql, [id_produk], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching join sql: ' + err.message });
        }
        return res.status(200).json({ message: 'Purchasing created successfully', data: result[0] });
    });
});

router.put('/update-cancel-purchasing/:id_pembelian', (req, res) => {
    const { id_pembelian } = req.params;
    const { status = 2 } = req.body;

    connection.query('UPDATE purchasing SET status = ?, tanggal_batal_pembelian = NOW() WHERE id_pembelian = ?', [status, id_pembelian], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating status canceling purchasing: ' + err.message });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Purchasing not found' });
        }
    });

    connection.query('SELECT * FROM purchasing WHERE id_pembelian = ?', [id_pembelian], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching purchasing: ' + err.message });
        }


        return res.status(200).json({ message: 'Purchasing fetched successfully', data: result[0] });
    });
});

module.exports = router;