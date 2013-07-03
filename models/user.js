var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Promise = mongoose.Promise,
	userSchema = mongoose.Schema({
		email: String,
		hashed_password: String,
		salt: String
	});

userSchema.statics.getUser = function(id, callback) {

	"use strict";
	
	var promise = new Promise();
	if (callback) {
		promise.addBack(callback);
	}
	if (!id) {
		id = {}; // all users
	}
	else {
		id = {_id: id }; // specific user
	}
	this.find(id, promise.resolve.bind(promise));
	return promise;
};

userSchema.methods = {

	makeSalt: function() {
		
		"use strict";
		
		return Math.round((new Date().valueOf() * Math.random())) + '';
	},

	validPassword: function(plainText) {
		
		"use strict";

		return this.encryptPassword(plainText) === this.hashed_password;
	},

	encryptPassword: function(password) {

		"use strict";

		if (!password) {
			return '';
		}
		
		return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
	}
};

userSchema.virtual('password')
	.set(function(password) {

		"use strict";

		this._password = password;
		this.salt = this.makeSalt();
		this.hashed_password = this.encryptPassword(password);
	})
	.get(function() { 

		"use strict";

		return this._password;
	});


module.exports = mongoose.model('User', userSchema); 
