const router = require('express').Router();
const { pesanan } = require('../controllers');

// GET localhost:8080/biodata => Ambil data semua produk
router.get('/', pesanan.getDataPesanan);

// // GET localhost:8080/biodata/2 => Ambil data semua produk berdasarkan id = 2
// router.get('/:id', produk.getDetailBiodata);

// // // POST localhost:8080/biodata/add => Tambah data produk ke database
router.post('/add', pesanan.addDataPesanan);

// // // PUT localhost:8080/biodata/edit/2 => Edit data produk
router.put('/edit/:id', pesanan.editDataPesanan);

// // // DELETE localhost:8080/biodata/delete => Delete data produk
router.delete('/delete/:id', pesanan.deleteDataPesanan);

module.exports = router;