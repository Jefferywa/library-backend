const mysql 	= require('mysql');
const conf 		= require('./../mysql/config.json');

var DBData = {
	host     : conf.host, 
	user     : conf.user, 
	password : conf.pass, 
	database : conf.db
};

var Connection = mysql.createConnection(DBData);

var getBooks 	= 'CALL getBooks()';
var bookItBook 	= 'CALL bookItBook(?)';
var	signIn 		= 'CALL signin(?, ?)';
var signUp		= 'CALL signup(?, ?, ?, ?)';

var MySQL_Connection = function(DBData) {
	return Connection = mysql.createConnection(DBData);
	console.log(Connection);
};

module.exports.Connection 		= Connection;
module.exports.DBData 			= DBData;
module.exports.getBooks 		= getBooks;
module.exports.signIn 			= signIn;
module.exports.signUp 			= signUp;
module.exports.MySQL_Connection = MySQL_Connection;