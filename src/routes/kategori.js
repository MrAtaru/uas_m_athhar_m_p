const router = require('express').Router();
const { kategori } = require('../controllers');

// GET localhost:8080/biodata => Ambil data semua produk
router.get('/', kategori.getDataKategori);

// // GET localhost:8080/biodata/2 => Ambil data semua produk berdasarkan id = 2
// router.get('/:id', produk.getDetailBiodata);

// // // POST localhost:8080/biodata/add => Tambah data produk ke database
router.post('/add', kategori.addDataKategori);

// // // PUT localhost:8080/biodata/edit/2 => Edit data produk
router.put('/edit/:id', kategori.editDataKategori);

// // // DELETE localhost:8080/biodata/delete => Delete data produk
router.delete('/delete/:id', kategori.deleteDataKategori);

module.exports = router;