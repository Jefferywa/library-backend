const router 		 	= require('express').Router()
const mysql 		 	= require('mysql');
const express 		 	= require('express');
const SQL   		 	= require('./mysql/connect');
const bodyParser  	 	= require('body-parser');
const session   	 	= require('express-session');
const parseurl 	 	 	= require('parseurl');
const app 			 	= express();
const urlencodedParser 	= bodyParser.urlencoded({extended: false});

router.get('/getBooks', urlencodedParser, function (req, res, next) {
	if(!req.body || req.body.length === 0) {
    	console.log('request body not found');
    	return res.sendStatus(400);
  	}

  	console.log('1!');

	SQL.MySQL_Connection(SQL.DBData).query(SQL.getBooks, function(error, result, fields) {
		if (error) {
			throw error;
		} else {
			result = result[0];
			var result = {"result" : result };

			res.send(JSON.stringify(result));

		}
	});
	SQL.MySQL_Connection(SQL.DBData).end();
})

router.post('/bookItBook', urlencodedParser, function (req, res, next) {
	if(!req.body || req.body.length === 0) {
    	console.log('request body not found');
    	return res.sendStatus(400);
  	}

  	var id = req.body.id;

  	console.log('req', req, ' | req.body', req.body, ' | id', id)
	console.log('res', res.json)

  	SQL.MySQL_Connection(SQL.DBData).query(SQL.bookItBook, [id], function(error, result, fields) {
		if (error) {
			throw error
		} else {
			try {
				var result = result[0];
				console.log(result);

				res.send({message: 'Book It'});

			} catch(e) {
				console.log('Error:', error);
				res.send({message: 'Ошибка'});
			}
		}
	});
	SQL.MySQL_Connection(SQL.DBData).end();
})

module.exports = router;