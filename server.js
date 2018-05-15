const express		= require('express');
const path 			= require('path');
const app 			= express();
const parseurl 		= require('parseurl');
const SRes 			= require('./routes/s_response/res');	

var port 			= 80;

app.use('/', require('./routes/books.js'));
app.use('/', require('./routes/signin.js'));
app.use('/', require('./routes/signup.js'));

app.use(function(req, res, next) {
	if (req) {
		if (req.code === 404) {
			res.json(400, SRes.message[2])
		}
	} 
});

app.listen(port, function() {
  	console.log('Server is running on port: ', port);
});
