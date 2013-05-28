var mongoose = require('mongoose'),
	Promise = mongoose.Promise,
	articleSchema = mongoose.Schema({
		title: String,
		body: String,
		created: {type : Date, default : Date.now}
	});

articleSchema.statics.getArticle = function(id, callback) {
	var promise = new Promise;
	if (callback) {
		promise.addBack(callback);
	}
	if (!id) {
		id = {} // all articles
	}
	else {
		id = { _id: id } // specific article
	}
	this.find(id, promise.resolve.bind(promise));
	return promise;
}

module.exports = mongoose.model('Article', articleSchema); 
