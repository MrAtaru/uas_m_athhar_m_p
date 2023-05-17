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
const getDataUsers = async (req, res) => {
    try{const data = await new Promise((resolve,reject) => {
        connection.query('SELECT * FROM users' , function (error, rows) {
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
const addDataUsers = async(req, res) => {
    try{
        let data = {
    
            firstname   : req.body.firstname,
            lastname    : req.body.lastname,
            username    : req.body.username,
            password    : req.body.password,
        }
        const result = await new Promise((resolve, reject) => {
            connection.query('INSERT INTO users SET ?;', [data], function(error, rows) {
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
const editDataUsers = async(req, res) => {
    try{let id = req.params.id;

        let dataEdit = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: req.body.password
        }
    
        const result = await new Promise((resolve, reject) => {
            connection.query('UPDATE users SET ? WHERE id = ?;', [dataEdit, id], function(error, rows) {
                if (rows) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
    
        (result) 
            res.send({
                succes: true,
                message: 'Berhasil edit data'
            });
         }
    catch (error) {
        res.send({
            succes: false,
            message: error.stack
        });
    }
}

//menghapus data
const deleteDataUsers = async(req, res) => {
    try{let id = req.params.id;

        const result = await new Promise((resolve, reject) => {
            connection.query('DELETE FROM users WHERE id = ?;', [id], function (error, rows) {
                if (rows) {
                    resolve(true);
                } else {
                    reject(false);
                }
            });
        });
    
         (result) 
            res.send({
                succes: true,
                message: 'Berhasil menghapus data'
            })
        } catch (error) {
        res.send({
            succes: false,
            message: 'Gagal menghapus data'
        }); 
    }
}

module.exports ={
    getDataUsers,
    addDataUsers,
    editDataUsers,
    deleteDataUsers
}