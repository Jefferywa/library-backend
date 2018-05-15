const express = require('express');

var message = {
	success_b 	: 'Book successfully booked',
	success_l	: 'You have successfully entered',
  	success_r 	: 'Registration completed successfully', 
  	badRequest  : 'You entered an incorrect login or password', 
  	error 		: 'An error has occurred'
}

module.exports = {
	message : message
};