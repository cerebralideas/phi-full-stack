// Check if user is currently authenticated - GET

exports.authorized = function (req, res, next) {
	"use strict";
	if (!req.isAuthenticated()) {
		return res.redirect('/login');
	}
	next();
};


// Show login form if logged out GET

exports.login = function(req, res){
	"use strict";
	// Helper to create first db user on login
	// var User = require('../models/user'),
	// user = new User({
	//			email: 'root@foo.bar',
	//			password: 'foo'
	//		});

	// user.save();

	if(!req.isAuthenticated()) {
		res.render('./users', { 
			title: 'Login!',
			path: '/login',
			authorized: req.isAuthenticated(),
			user: { email: 'root@foo.bar', 
					password: 'foo'
				}
		});
	}
	else {
		res.redirect('/users');
	}
};
