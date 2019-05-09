var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var dbConfig = require('../../db/dbconfig');
var pool = mysql.createPool(dbConfig.mysql);

router.post('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'content-type');
    // 从连接池获取连接 
    console.log(req.body);

    pool.getConnection(function (err, connection) {
        var user_sql = `select * from user`;
        connection.query(`${user_sql}`, function (err, result) {
            if (!err) {
                let data = {}
                data.responseMessage = "ok"
                data.responseCode = '000000'
                data.data = result[0]
                 console.log(result);
                res.send(data);
            } else {
                console.log(err);
            }
            // 释放连接  
            connection.release();

        });
    });
});

module.exports = router;