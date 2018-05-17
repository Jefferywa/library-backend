const mysql = require('mysql')
const SQL = require('../mysql/connect')
const SRes = require('../s_response/res')
const jwt = require('jsonwebtoken')

function getToken(user, secret) {
	var token = jwt.sign(user, secret, { 
		expiresIn: 1800 
	})

	return token;
}

module.exports = {
	getToken: getToken
};