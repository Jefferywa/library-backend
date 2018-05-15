const express = require('express');

var message = {
	success_l	: 'You have successfully entered',
  	success_r 	: 'Registration completed successfully', 
  	badRequest  : 'You entered an incorrect login or password', 
  	error 		: 'An error has occurred'
}

var status = {
	false : false,
	true : true
}

function _accept(err, req, res, next) {
	console.error(err.stack)
	res.status(200).send('Ok!')
}

function c_error(err, req, res, next) {
	console.error(err.stack)
	res.status(400).send('What is missing here')
}

function s_error (err, req, res, next) {
	console.error(err.stack)
	res.status(500).send('Something went wrong')
}

module.exports.message = message;
module.exports.status = status;
module.exports._accept = _accept;
module.exports.c_error = c_error;
module.exports.s_error = s_error;