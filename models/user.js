var mongoose = require('mongoose'),
	Promise = mongoose.Promise,
	userSchema = mongoose.Schema({
		email: String,
		password: String
	});

userSchema.statics.getUser = function(id, callback) {
	var promise = new Promise;
	if (callback) promise.addBack(callback);
	if (!id) {
		id = {} // all users
	}
	else {
		id = {_id: id } // specific user
	}
	this.find(id, promise.resolve.bind(promise));
	return promise;
}

module.exports = mongoose.model('User', userSchema); 
