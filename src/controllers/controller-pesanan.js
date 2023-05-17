const config = require('../configs/database');
const mysql = require('mysql');
const session = require('express-session');
const express = require('express');
const { password } = require('../configs/database');
const connection = mysql.createConnection(config);
connection.connect();

const app = express();

app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));

//menampilkan semua data
const getDataPesanan = async (req, res) => {
    try{const data = await new Promise((resolve,reject) => {
        connection.query('SELECT pesanan.kode_pesanan,pesanan.nama_pesanan,kategori.kategori,pesanan.harga,pesanan.jumlah,pesanan.potongan,pesanan.total_pembayaran,kasir.nama_kasir,kasir.jenis_kelamin,pembeli.nama FROM pesanan JOIN kategori ON pesanan.id_kategori = kategori.id JOIN kasir ON pesanan.no_kasir = kasir.no_kasir JOIN pembeli ON pesanan.kode_pembeli = pembeli.kode_pembeli' , function (error, rows) {
            if (rows) {
                resolve(rows);
            } else {
                reject([]);
            }
        });
    });
    if (req.session.loggedin) { 
        res.send({
            success: true,
            message: 'berhasil ambil data',
            data: data
        });
    } else {
        res.send({
            success: false,
            message: 'Silahkan Login Terlebih Dahulu',
        });
    }
}
     catch (error) {
        console.info(error);
        res.send({
            success: false,
            message: error.stack
        });
    }
}


// menambahkan data
const addDataPesanan = async(req, res) => {
    try{let total = req.body.harga * req.body.jumlah
        let potongan
        // jika user membeli dengan harga ...
        if (total > 100000 ) {
             potongan = 20000;
        } else {
             potongan = 0;
        }
    
        // total harga
        let total_pembayaran = total - potongan;
    
        let data = {
    
            nama_pesanan: req.body.nama_pesanan,
            id_kategori: req.body.id_kategori,
            harga: req.body.harga,
            jumlah: req.body.jumlah,
            potongan: potongan,
            total_pembayaran: total_pembayaran,
            no_kasir: req.body.no_kasir,
            kode_pembeli: req.body.kode_pembeli
        }
        const result = await new Promise((resolve, reject) => {
            connection.query('INSERT INTO pesanan SET ?;', [data], function(error, rows) {
                if (rows) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
        if (req.session.loggedin) { 
            (result)
            res.send({
                success: true,
                message: 'berhasil menambahkan data',
                data: data
            });
        } else {
            res.send({
                success: false,
                message: 'Silahkan Login Terlebih Dahulu',
            });
        }
         } 
     catch (error) {
            console.log(error);
        res.send({
            succes: false,
            message: error.stack
        });
    }
}

//mengubah data
const editDataPesanan = async(req, res) => {
    try{let kode_pesanan = req.params.kode_pesanan;

        let total = req.body.harga * req.body.jumlah;
    
        let potongan;
        // jika user membeli dengan harga ...
        if (total > 100000 ) {
             potongan = 20000;
        } else {
             potongan = 0;
        }
    
        // total harga
        let total_pembayaran = total - potongan;
    
        let dataEdit = {
            nama_pesanan: req.body.nama_pesanan,
            id_kategori: req.body.id_kategori,
            harga: req.body.harga,
            jumlah: req.body.jumlah,
            potongan: potongan,
            total_pembayaran: total_pembayaran,
            no_kasir: req.body.no_kasir,
            kode_pembeli: req.body.kode_pembeli
        }
    
        const result = await new Promise((resolve, reject) => {
            connection.query('UPDATE pesanan SET ? WHERE kode_pesanan = ?;', [dataEdit, kode_pesanan], function(error, rows) {
                if (rows) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
        if (req.session.loggedin) { 
            (result)
            res.send({
                success: true,
                message: 'berhasil mengubah data',
                data: data
            });
        } else {
            res.send({
                success: false,
                message: 'Silahkan Login Terlebih Dahulu',
            });
        }
         }
    catch (error) {
        res.send({
            succes: false,
            message: error.stack
        });
    }
}

//menghapus data
const deleteDataPesanan = async(req, res) => {
    try{let kode_pesanan = req.params.kode_pesanan;

        const result = await new Promise((resolve, reject) => {
            connection.query('DELETE FROM pesanan WHERE kode_pesanan = ?;', [kode_pesanan], function (error, rows) {
                if (rows) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
        if (req.session.loggedin) { 
            (result)
            res.send({
                success: true,
                message: 'berhasil menambahkan data',
                data: data
            });
        } else {
            res.send({
                success: false,
                message: 'Silahkan Login Terlebih Dahulu',
            });
        }
        } catch (error) {
        res.send({
            succes: false,
            message: 'Gagal menghapus data'
        }); 
    }
}

module.exports ={
    getDataPesanan,
    addDataPesanan,
    editDataPesanan,
    deleteDataPesanan
}