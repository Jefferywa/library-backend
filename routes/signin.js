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

router.get('/auth', function (req, res) {
	res.render('pages/auth')
})

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
				status: false,
				message: "Error occured: " + error
			});
		} else {
			try {
				if (result[0].length != 0) {
					var result = result[0][0];
					var data = {
						payload: {
							userID: result.uid,
							userRole: result.userRole,
							userName: result.login
						}
					}
					var userData = {
						user: {
							firstname: result.firstname,
							lastname: result.lastname,
							phoneNumber: result.phoneNumber
						}
					}

					var salt = result.salt
					var hash = crypto.createHash('sha256').update(salt + password).digest('base64')

					if (hash === result.password) {
						var secret = req.app.get('secret')
						var token = auth.getToken(data.payload, secret)
						
						//res.cookie("authToken", token) //TODO
						res.status(200).json({
							status: true,
							token: token,
							data: userData,
							message: SRes.message.success_l
						})
					} else {
						res.status(200).json({
							status: false,
							message: SRes.message.badRequest
						})
					}
				} else {
					res.status(200).json({
						status: false,
						message: SRes.message.badRequest
					})
				}
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