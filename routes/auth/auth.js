const mysql 	= require('mysql')
const SQL   	= require('../mysql/connect')
const SRes 		= require('../s_response/res')
const jwt 		= require('jsonwebtoken')	

function getToken(user, secret) {
	var token = jwt.sign(user, secret, { expiresIn: 2000 })

	return token;
}

function getUser(token, secret) {
	var user = jwt.verify(token, secret)

	return user;
}

module.exports = {
	getToken : getToken,
	getUser  : getUser
};