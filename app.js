#!/usr/bin/env node

/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./controllers')
	, users = require('./controllers/user')
	, passport = require('passport')
	, mongoose = require('mongoose')
	, http = require('http')
	, path = require('path')
	, port = 8080
	, url  = 'http://localhost:' + port + '/'
/* We can access nodejitsu enviroment variables from process.env */
/* Note: the SUBDOMAIN variable will always be defined for a nodejitsu app */
if(process.env.SUBDOMAIN){
	url = 'http://' + process.env.SUBDOMAIN + '.jit.su/';
}


var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || port);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session({ secret: 'keyboard cat' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

// MongoDB Connect

require('express-mongoose');
mongoose.connect('mongodb://localhost/phi');

// Passport Config

require('./config/passport')(passport);

// Routes

app.get('/', routes.index);

app.get('/login', users.login);
app.post('/login', 
	passport.authenticate('local', 
		{	successRedirect: '/',
			failureRedirect: '/login',
			failureFlash: false 
		})
);

app.get('/users', users.authorized, users.list);
app.get('/users/:userid', users.authorized, users.editUser);
app.get('/users/:userid/delete', users.authorized, users.deleteUser);

app.post('/createuser', users.authorized, users.createUser);
app.post('/updateuser/:userid', users.authorized, users.updateUser);
app.post('/users/:userid/deleteuser', users.authorized, users.deleteUserConfirmed);



http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
	console.log(url);
});