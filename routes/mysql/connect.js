const mysql 	= require('mysql');
const config 	= require('./../mysql/config.json');

var DBData = {
	host     : config.host, 
	user     : config.user, 
	password : config.pass, 
	database : config.db
};

var Connection = mysql.createConnection(DBData);

var getBooks 	= 'CALL getBooks()';
var bookItBook 	= 'CALL bookItBook(?)';
var	signIn 		= 'CALL signin(?)';
var signUp		= 'CALL signup(?, ?, ?, ?, ?)';

var MySQL_Connection = function(DBData) {
	return Connection = mysql.createConnection(DBData);
	console.log(Connection);
};

module.exports = {
	MySQL_Connection : MySQL_Connection,
	Connection 		 : Connection,
	DBData 			 : DBData,
	getBooks 		 : getBooks,
	bookItBook 		 : bookItBook,
	signIn 			 : signIn,
	signUp 			 : signUp
};