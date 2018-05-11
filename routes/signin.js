const router 		 = require('express').Router();
const mysql 		 = require('mysql');
const express 		 = require('express');
const SQL   		 = require('./../mysql/connect');
const bodyParser  	 = require("body-parser");
const session   	 = require('express-session');
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/signin', function (req, res) {
	res.render('signin.ejs');
});

router.post('/login', urlencodedParser, function (req, res) {
	if(!req.body || req.body.length === 0) {
    	console.log('request body not found');
	    return res.sendStatus(400);
  	}

	SQL.MySQL_Connection(SQL.DBData).query(SQL.Auth, [req.body.login, req.body.pass], function(error, result) { 
		if (error) throw error;
			try {
				var result = result[0];
				if (result[0].ULogin!=undefined) {

					res.send({message: 'Вход успешен'});

					var login = result[0].login;
					var uid = result[0].uid;

					global.uData = [{UID, ULogin}];
				}
			} catch(e) {
				console.log('Error:', error);
				res.send({message: 'Вы ввели неправельный логин или пароль'});
			}
	}); 
});

module.exports = router;