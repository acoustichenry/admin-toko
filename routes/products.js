const express = require('express');
const router = express.Router();
const connection = require('../config/db');

router.get('/get-product', (req, res) => {
    connection.query('SELECT * FROM product', (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching products' });
        }

        res.status(200).json({ message: 'Products fetched successfully', data: rows });
    });
});

router.post('/create-product', (req, res) => {
    const { nama_produk, harga, kategori, deskripsi } = req.body;

    connection.query('INSERT INTO product (nama_produk, harga, kategori, deskripsi) VALUES (?, ?, ?, ?)', [nama_produk, harga, kategori, deskripsi], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error creating product' });
        }
        res.status(200).json({ message: 'Product created successfully', data: req.body });
    });
});


router.put('/update-stock-product/:id_produk', (req, res) => {
    const { stok = 0 } = req.body;
    const { id_produk } = req.params;    

    connection.query('UPDATE product_stock SET stok = stok + ? WHERE id_produk = ?', [stok, id_produk], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating stock product' });
        }
    });

    connection.query(
        'SELECT stok FROM product_stock WHERE id_produk = ?',
        [id_produk],
        (err2, rows) => {
            if (err2) {
                return res.status(500).json({ message: 'Error getting updated stock' });
            }

            res.status(200).json({
                message: "Stock product updated successfully",
                new_stock: rows[0].stok
            });
        }
    );
});

router.put('/update-product/:id_produk', (req, res) => {
    const { nama_produk = '', harga = 0, kategori = '', deskripsi = '' } = req.body;
    const { id_produk } = req.params;

    connection.query('UPDATE product SET nama_produk = ?, harga = ?, kategori = ?, deskripsi = ? WHERE id_produk = ?', [nama_produk, harga, kategori, deskripsi, id_produk], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating product' });
        }
        res.status(200).json({ message: 'Product updated successfully', data: req.body });  
    });
});

router.delete('/delete-product', (req, res) => {
    const { id } = req.body;
    connection.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting product' });
        }
        res.json({ message: 'Product deleted successfully' });
    });
});

router.get('/get-product-by-id/:id_produk', (req, res) => {
    const { id_produk } = req.params;
    connection.query('SELECT * FROM product WHERE id_produk = ?', [id_produk], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching product by id: ' + err.message });
        }
        res.status(200).json({ message: 'Product fetched successfully', data: result });
    });
});

router.get('/stock-product', (req, res) => {
    connection.query('SELECT * FROM stocks', (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching stock product' });
        }
        res.json(result);
    });
});

router.get('/purchase-product', (req, res) => {
    connection.query('SELECT * FROM purchasing', (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching purchase product' });
        }
        res.json(result);
    });
});

module.exports = router;