const express = require('express')
const router = express.Router()
const mysql = require('mysql')
const bodyParser = require('body-parser')
const session = require('express-session')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const config = require('./mysql/config')
const SQL = require('./mysql/connect')
const SRes = require('./s_response/res')
const auth = require('./auth/auth')

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var parseJSON = bodyParser.json();

router.post('/signin', urlencodedParser, parseJSON, function (req, res) {
	if (!req.body || req.body.length === 0) {
		console.log('request body not found');
		return res.sendStatus(400);
	}

	var login = req.body.login
	var password = req.body.password

	SQL.MySQL_Connection(SQL.DBData).query(SQL.signIn, [login], function (error, result) {
		if (error) {
			res.json({
				type: false,
				data: "Error occured: " + error
			});
		} else {
			try {
				if (result) {
					var result = result[0][0];
					var userData = {
						user: {
							userID: result.uid,
							userRole: result.userRole,
							userName: result.login
						},
						firstname: result.firstname,
						lastname: result.lastname,
						phoneNumber: result.phoneNumber
					}

					var salt = result.salt
					var hash = crypto.createHash('sha256').update(salt + password).digest('base64')

					if (hash === result.password) {
						var secret = req.app.get('secret')
						var token = auth.getToken(userData.user, secret)

						res.cookie("authToken", token)
						res.status(200).json({
							type: true,
							data: userData,
							message: SRes.message.success_l
						})
					} else {
						res.status(403).json({
							type: false,
							message: SRes.message.badRequest
						})
					}
				} else {
					res.status(403).json({
						type: false,
						message: SRes.message.badRequest
					})
				}
			} catch (e) {
				res.status(500).json({
					message: SRes.message.error
				});
			}
		}
	});
});

module.exports = router;