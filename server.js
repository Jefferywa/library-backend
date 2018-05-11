const express		= require('express');
const path 			= require('path');
const app 			= express();
const parseurl 		= require('parseurl');

var port 		= 80;

app.use('/', require('./routes/books.js'));

//LISTEN PORT 80
app.listen(port, function() {
  console.log('Server is running on port: ', port);
});
