const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const bodyParser = require('body-parser')

const SQL = require('./mysql/connect')

var urlencodedParser = bodyParser.urlencoded({ extended: true });
var parseJSON = bodyParser.json();

router.get('/', urlencodedParser, function (req, res, next) {
    if (!req.body || req.body.length === 0) {
        console.log('request body not found');
        return res.sendStatus(400);
    }

    SQL.MySQL_Connection(SQL.DBData).query(SQL.getBooks, function (error, result, fields) {
        if (error) {
            res.json({
                type: false,
                message: "Error occured: " + error
            });
        } else {
            result = result[0];

            res.render('pages/index', { result : result })

        }
    })
    SQL.MySQL_Connection(SQL.DBData).end();
})

module.exports = router;