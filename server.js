const express = require('express')
const path = require('path')
const parseurl = require('parseurl')
const app = express()
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const ejs = require('ejs')
const router = express.Router()

const SRes = require('./routes/s_response/res')
const config = require('./routes/mysql/config')
const bodyParser = require('body-parser')

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

var parseJSON = bodyParser.json()

router.use(parseJSON, function (req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	console.log("token", token)
	//var token = req.cookies["authToken"];

	if (token) {
		jwt.verify(token, req.app.get('secret'), function (err, decoded) {
			if (err) {
				return res.json({
					status: false,
					message: 'Failed to authenticate token.'
				})
			} else {
				req.decoded = decoded;
				next()
			}
		})
	} else {
		return res.status(403).json({
			status: false,
			message: 'No token provided.'
		})
	}
})


app.use('/', index)
app.use('/', signin)
app.use('/', router) // THIS IS BULLSHIT, I FUCKED THIS LANGUAGE
app.use('/', signup)
app.use('/', books)

app.use(function (req, res, next) {
	if (req) {
		if (req.code === 404) {
			res.json(404, SRes.message.error)
		}
	}
})

app.listen(port, function () {
	console.log('Server is running on port: ', port);
})
