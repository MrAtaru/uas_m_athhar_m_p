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
const getDataKasir = async (req, res) => {
    try{const data = await new Promise((resolve,reject) => {
        connection.query('SELECT * FROM kasir' , function (error, rows) {
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
const addDataKasir = async(req, res) => {
    try{
        let data = {
    
            nama_kasir: req.body.nama_kasir,
            jenis_kelamin: req.body.jenis_kelamin,
        }
        const result = await new Promise((resolve, reject) => {
            connection.query('INSERT INTO kasir SET ?;', [data], function(error, rows) {
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
const editDataKasir = async(req, res) => {
    try{let id = req.params.no_kasir;

        let dataEdit = {
            nama_Kasir: req.body.nama_Kasir,
            jenis_kelamin: req.body.jenis_kelamin
        }
    
        const result = await new Promise((resolve, reject) => {
            connection.query('UPDATE kasir SET ? WHERE no_kasir = ?;', [dataEdit, id], function(error, rows) {
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
        }         }
    catch (error) {
        res.send({
            succes: false,
            message: error.stack
        });
    }
}

//menghapus data
const deleteDataKasir = async(req, res) => {
    try{let id = req.params.no_kasir;

        const result = await new Promise((resolve, reject) => {
            connection.query('DELETE FROM kasir WHERE no_kasir = ?;', [id], function (error, rows) {
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
    getDataKasir,
    addDataKasir,
    editDataKasir,
    deleteDataKasir
}