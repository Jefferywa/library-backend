const router 		 	= require('express').Router()
const mysql 		 	= require('mysql')
const express 		 	= require('express')
const SQL   		 	= require('./mysql/connect')
const config 			= require('./mysql/config.json')
const SRes 		 	 	= require('./s_response/res')
const bodyParser  	 	= require('body-parser')
const session   	 	= require('express-session')
const crypto 			= require('crypto')

var urlencodedParser 	= bodyParser.urlencoded({extended: false});
var parseJSON 			= bodyParser.json();

router.post('/signin', urlencodedParser, parseJSON, function (req, res) {
	if(!req.body || req.body.length === 0) {
    	console.log('request body not found');
	    return res.sendStatus(400);
  	}

  	var login = req.body.login
	var password = req.body.password

	SQL.MySQL_Connection(SQL.DBData).query(SQL.signIn, [login], function(error, result) {
		if (error) throw error;
		try {
			var result = result[0];

			if (result.length != 0) {

			  	var salt = result[0].salt
			  	var hash = crypto.createHash('sha256').update(salt + password).digest('base64')
				
				if(hash === result[0].password) {
				    res.status(200).json({ status : SRes.status.true, msg : SRes.message.success_l })
				} else {
					res.status(403).json({ status : SRes.status.false, msg : SRes.message.badRequest })
				}
			
			} else {
				res.status(403).json({ status : SRes.status.false, msg : SRes.message.badRequest })
			}
		} catch(e) {
			res.status(500).json({ msg : SRes.message.error });
		}
	});
});

module.exports = router;