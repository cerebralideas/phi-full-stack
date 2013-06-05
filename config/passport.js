// Passport with local authentication through email adress and plain text passwords
var	LocalStrategy = require('passport-local').Strategy,
	User = require('../models/user');

module.exports = function (passport) {
	
	"use strict";

	passport.serializeUser(function(user, done) {
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use(new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password'
		},
		function(email, password, done) {
			User.findOne({ email: email }, function(err, user) {
				if (err) { 
					return done(err); 
				}
				if (!user) {
					return done(null, false, { message: 'Incorrect username.' });
				}
				if (!user.validPassword(password)) {
					return done(null, false, { message: 'Incorrect password.' });
				}

				return done(null, user);
			});
		}
	));
};