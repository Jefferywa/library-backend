const express = require('express')
const path = require('path')
const parseurl = require('parseurl')
const app = express()
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const ejs = require('ejs')

const SRes = require('./routes/s_response/res')
const config = require('./routes/mysql/config')


var index =	require('./routes/index.js')
var books = require('./routes/books.js')
var signin = require('./routes/signin.js')
var signup = require('./routes/signup.js')
var userData = require('./routes/userData.js')

var port = 80;

//view engine
app.set('view engine', 'ejs')
//jwt secret
app.set('secret', config.secret)
//public dir
app.use(express.static(path.join(__dirname, './public/')));

app.use(cookieParser())

app.use('/', index)
app.use('/', userData.router)
app.use('/', books)
app.use('/', signin)
app.use('/', signup)

app.use(function (req, res, next) {
	if (req) {
		if (req.code === 404) {
			res.json(404, SRes.message.error)
		}
	}
});

app.listen(port, function () {
	console.log('Server is running on port: ', port);
});
