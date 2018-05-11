const router 		 = require('express').Router();
const mysql 		 = require('mysql');
const express 		 = require('express');
const SQL   		 = require('./../mysql/connect');
const bodyParser  	 = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/signup', function (req, res) {
	res.render('signup.ejs');
});


router.post('/register', urlencodedParser, function (req, res) {
	if(!req.body || req.body.length === 0) {
    	console.log('request body not found');
    return res.sendStatus(400);
  	}

	SQL.MySQL_Connection(SQL.DBData).query(SQL.Reg, [req.body.login, req.body.password, req.body.firstname, req.body.lastname], function(error, result) { 
		if (error) throw error;
			try {
				res.send({message: 'Регистрация прошла успешно!'});			
			} catch(e) {
				console.log('Error:', error);
				res.send({message: 'Произошла ошибка'});
			}	
	});
});

module.exports = router;