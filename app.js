#!/usr/bin/env node

/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./controllers'),
	auth = require('./controllers/authorization'),
	users = require('./controllers/user'),
	articles = require('./controllers/article'),
	passport = require('passport'),
	mongoose = require('mongoose'),
	http = require('http'),
	path = require('path'),
	port = 8080,
	url = 'http://localhost:' + port + '/';
	/* We can access nodejitsu enviroment variables from process.env */
	/* Note: the SUBDOMAIN variable will always be defined for a nodejitsu app */
if (process.env.SUBDOMAIN) {
	url = 'http://' + process.env.SUBDOMAIN + '.jit.su/';
}


var app = express();

app.configure(function() {
	"use strict";
	app.set('port', process.env.PORT || port);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session({
		secret: 'keyboard cat'
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function() {
	"use strict";
	app.use(express.errorHandler());
});

// MongoDB Connect

require('express-mongoose');
mongoose.connect('mongodb://localhost/phi');

// Passport Config

require('./config/passport')(passport);

// Routes

app.get('/', routes.index);

app.get('/login', auth.login);
app.post('/login',
	passport.authenticate('local', {
	successRedirect: '/users',
	failureRedirect: '/login',
	failureFlash: false
}));


app.get('/createfirstuser', auth.createFirstUser);

app.get('/users', auth.authorized, users.list);
app.get('/users/:userid', auth.authorized, users.editUser);
app.get('/users/:userid/delete', auth.authorized, users.deleteUser);

app.post('/createuser', auth.authorized, users.createUser);
app.post('/createuser', auth.authorized, users.createUser);
app.post('/updateuser/:userid', auth.authorized, users.updateUser);
app.post('/users/:userid/deleteuser', auth.authorized, users.deleteUserConfirmed);

app.get('/articles', articles.list);
app.get('/articles/:articleid', articles.editArticle);
app.get('/articles/:articleid/delete', articles.deleteArticle);

app.post('/createarticle', articles.createArticle);
app.post('/updatearticle/:articleid', articles.updateArticle);
app.post('/articles/:articleid/deletearticle', articles.deleteArticleConfirmed);



http.createServer(app).listen(app.get('port'), function() {
	"use strict";
	console.log("Express server listening on port " + app.get('port'));
	console.log(url);
});