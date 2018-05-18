const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const auth = require('./auth/auth')

var urlencodedParser = bodyParser.urlencoded({ extended: true })
var parseJSON = bodyParser.json()

router.use(parseJSON, function (req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	//var token = req.cookies["authToken"];

	if (token) {
		jwt.verify(token, req.app.get('secret'), function (err, decoded) {
			if (err) {
				return res.json({ 
					status: false, 
					message: 'Failed to authenticate token.' 
				})
			} else {
				req.decoded = decoded;
				next()
			}
		})
	} else {
		return res.status(403).json({
			status: false,
			message: 'No token provided.'
		})
	}
})

module.exports = {
	router: router
};	