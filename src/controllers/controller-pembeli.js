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
const getDataPembeli = async (req, res) => {
    try{const data = await new Promise((resolve,reject) => {
        connection.query('SELECT * FROM pembeli' , function (error, rows) {
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
const addDataPembeli = async(req, res) => {
    try{
        let data = {
            nama: req.body.nama
        }
        const result = await new Promise((resolve, reject) => {
            connection.query('INSERT INTO pembeli SET ?;', [data], function(error, rows) {
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
            console.log(error);
        res.send({
            succes: false,
            message: error.stack
        });
    }
}

//mengubah data
const editDataPembeli = async(req, res) => {
    try{let id = req.params.kode_pembeli;

        let dataEdit = {
            nama: req.body.nama
        }
    
        const result = await new Promise((resolve, reject) => {
            connection.query('UPDATE pembeli SET ? WHERE kode_pembeli = ?;', [dataEdit, id], function(error, rows) {
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
const deleteDataPembeli = async(req, res) => {
    try{let id = req.params.kode_pembeli;

        const result = await new Promise((resolve, reject) => {
            connection.query('DELETE FROM pembeli WHERE kode_pembeli = ?;', [id], function (error, rows) {
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
                message: 'berhasil menghapus data',
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
    getDataPembeli,
    addDataPembeli,
    editDataPembeli,
    deleteDataPembeli
}