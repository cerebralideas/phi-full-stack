// Home page GET

var markdown = require('marked');

exports.index = function(req, res) {

	"use strict";
	
	var Article = require('../models/article'),
		callback = function(err, articles) {
			res.render('./index', {
				title: 'Express Article List!',
				authorized: req.isAuthenticated(),
				articles: articles,
				markdown: markdown
			});
		};

	Article.getArticle(null, callback);
};