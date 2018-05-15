const express 		 	= require('express')
const router 		 	= express.Router()
const jwt 				= require('jsonwebtoken')
const cookieParser 		= require('cookie-parser')

const auth 				= require('./auth/auth')
 
router.all("*", function (req, res, next) {
	var data = {};
	var token = req.cookies["authToken"];

	if (token) {
		data.user = auth.getUser(token, req.app.get('secret'))
	}

	req.data = data;

	next();
})

module.exports = {
	router : router
};