const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const session = require('express-session')
const parseurl = require('parseurl')
const cookieParser = require('cookie-parser')

const SQL = require('./mysql/connect')
const sRes = require('./s_response/res')

var urlencodedParser = bodyParser.urlencoded({ extended: true });
var parseJSON = bodyParser.json();

router.get('/getBooks', urlencodedParser, function (req, res, next) {
	if (!req.body || req.body.length === 0) {
		console.log('request body not found');
		return res.sendStatus(400);
	}

	SQL.MySQL_Connection(SQL.DBData).query(SQL.getBooks, function (error, result, fields) {
		if (error) {
			res.json({
				status: false,
				message: "Error occured: " + error
			});
		} else {
			result = result[0];

			res.json({
				result : result
			})
		}
	});
	SQL.MySQL_Connection(SQL.DBData).end();
})

router.post('/bookitbook', urlencodedParser, parseJSON, function (req, res) {
	if (!req.decoded) {
		console.log(req.decoded);
	}
	
	if (!req.body || req.body.length === 0) {
		console.log('request body not found');
		return res.sendStatus(400);
	}

	SQL.MySQL_Connection(SQL.DBData).query(SQL.bookItBook, [req.body.uid, req.body.bid], function (error, result) {
		if (error) {
			res.json({
				status: false,
				message: "Error occured: " + error
			})
		} else {
			try {
				var result = result[0];

				res.status(200).json({
					status: true,
					message: sRes.message.success_b
				})
			} catch (e) {
				console.log('Error:', error);
				res.status(500).json({
					status: false,
					message: sRes.message.error
				})
			}
		}
	})
	SQL.MySQL_Connection(SQL.DBData).end();
})

module.exports = router;