var friends = require('../models/mdl-friends');

var obj = function () {

	'use strict';

	return {

		index: function (req, res) {

			friends.find().
					done(function (friends) {

						res.render('index', {
							title: 'Friend Data',
							friends: friends
						});
					});
		},

		friend: function (req, res) {

			var id = req.params.id;

			friends.findOne(id).
					done(function (friend) {

						res.render('friend', {
							title: 'Friend Data',
							friend: friend
						});
					});
		}
	};
};

module.exports = obj();
