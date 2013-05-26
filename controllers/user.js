// Check if user is currently authenticated - GET

exports.authorized = function (req, res, next) {
	if (!req.isAuthenticated()) {
		return res.redirect('/login');
	}
	next();
};

// List of all users GET

exports.list = function(req, res){
	var User = require('../models/user'),
		callback = function (err, users) {
			res.render('./users', { 
				title: 'Add Users!',
				path: '/createuser',
				users: users
			})
		}

	User.getUser(null, callback);
};


// Show login form if logged out GET

exports.login = function(req, res){
	// var User = require('../models/user'),
	// user = new User({
	// 			email: 'root@foo.bar', 
	// 			password: 'foo'
	// 		});

	// user.save();
	
	if(!req.isAuthenticated()) {
		res.render('./users', { 
			title: 'Login!',
			path: '/login',
			user: { email: 'root@foo.bar', 
					password: 'foo'
				}
		});
	}
	else {
		res.redirect('/users');
	};
};

// Edit User GET

exports.editUser = function(req, res){
	var id = req.params.userid,
		User = require('../models/user'),
		callback = function (err, users) {
			var user = users[0];
			user.canDelete = true;
			res.render('./users', { 
				title: 'Edit ' + user.email + '!',
				path: '/updateuser/' + user._id,
				returnPath: '/users',
				user: user
			})
		};

	User.getUser(id, callback);
};

// Delete User Confirm GET

exports.deleteUser = function(req, res){
	var id = req.params.userid,
		User = require('../models/user'),
		callback = function (err, users) {
			var user = users[0];
			user.deleteConfirm = true;
			res.render('./users', { 
				title: 'Delete ' + user.email + '?',
				path: '/users/' + user._id + '/deleteuser',
				returnPath: '/users',
				user: user
			})
		};

	User.getUser(id, callback);
};

// Delete User - POST

exports.deleteUserConfirmed = function(req, res) {
		var id = req.params.userid,
		User = require('../models/user'),
		callback = function (err, users) {
			users[0].remove();
			res.redirect('/users');
		};

	User.getUser(id, callback);
};


// Create User - POST

exports.createUser = function(req, res) {
	var User = require('../models/user'),
		user = new User({
			email: req.body.email, 
			password: req.body.password
		});

	user.save(function(err) {
		if(!err) {
			require('./mail').generic();
			res.redirect('/users');
		}
	});
};

// Update User - POST

exports.updateUser = function(req, res) {
	var User = require('../models/user'),
		id = req.params.userid,
		user = {
			email: req.body.email, 
			password: req.body.password,
		};

	User.findByIdAndUpdate(id, user, function(err, user) {
		if(!err) {
			require('./mail').generic();
			res.redirect('/users');
		}
		else {
			res.redirect('/users/' + id);
		}
	});
};