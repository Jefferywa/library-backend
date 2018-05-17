const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const SQL = require('./mysql/connect');
const SRes = require('./s_response/res');

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var parseJSON = bodyParser.json();

function generateSalt(length) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+|";

	for (var i = 0; i < length; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
}

router.post('/signup', urlencodedParser, parseJSON, function (req, res) {
	if (!req.body || req.body.length === 0) {
		console.log('request body not found');
		return res.sendStatus(400);
	}

	var login = req.body.email
	var password = req.body.password
	var firstname = req.body.firstname
	var lastname = req.body.lastname

	var salt = generateSalt(32)
	var hash = crypto.createHash('sha256').update(salt + password).digest('base64')

	SQL.MySQL_Connection(SQL.DBData).query(SQL.signUp, [login, hash, firstname, lastname, salt], function (error, result) {
		if (error) {
			res.json({
				status: false,
				message: "Error occured: " + error
			});
		} else {
			try {
				res.status(200).json({
					status: true,
					message: SRes.message.success_r
				});
			} catch (e) {
				res.status(500).json({
					status: false,
					message: SRes.message.error
				});
			}
		}
	})
})

module.exports = router;