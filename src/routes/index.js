const router = require('express').Router();
const routeUsers = require('./users');
const routeKategori = require('./kategori');
const routeKasir = require('./kasir');
const routePembeli = require('./pembeli');
const routePesanan = require('./pesanan');

// GET localhost:8080/produk => Ambil data semua produk
router.use('/register', routeUsers);
router.use('/kategori', routeKategori);
router.use('/kasir', routeKasir);
router.use('/pembeli', routePembeli);
router.use('/pesanan', routePesanan);

module.exports = router;