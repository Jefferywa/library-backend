const express 		 	= require('express')
const router 		 	= express.Router()
const mysql 		 	= require('mysql')
const bodyParser  	 	= require('body-parser')
const session   	 	= require('express-session')
const parseurl 	 	 	= require('parseurl')
const cookieParser 		= require('cookie-parser')

const SQL   		 	= require('./mysql/connect')
const sRes 				= require('./s_response/res')

var urlencodedParser 	= bodyParser.urlencoded({extended: true});
var parseJSON 			= bodyParser.json();

router.get('/getBooks', urlencodedParser, function (req, res, next) {
	var data = req.data;
	console.log(data);

	if(!req.body || req.body.length === 0) {
    	console.log('request body not found');
    	return res.sendStatus(400);
  	}

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

router.post('/bookItBook', urlencodedParser, parseJSON, function (req, res, next) {
	if(!req.body || req.body.length === 0) {
    	console.log('request body not found');
    	return res.sendStatus(400);
  	}

  	var id = req.body.id;

  	SQL.MySQL_Connection(SQL.DBData).query(SQL.bookItBook, [req.body.id], function(error, result) {
		if (error) {
			res.json({
                type: false,
                data: "Error occured: " + error
            });
		} else {
			try {
				var result = result[0];

				res.status(200).json({
					type 	: true,
					message : sRes.message.success_b
				});
			} catch(e) {
				console.log('Error:', error);
				res.status(500).json({
					type 	: false,
					message : sRes.message.error
				});
			}
		}
	});
	SQL.MySQL_Connection(SQL.DBData).end();
})

module.exports = router;