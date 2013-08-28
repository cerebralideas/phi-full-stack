var Friends = require('../models/friendsModel');

exports.index = function (req, res) {

		Friends.
			find().
			done(function (friends) {

				res.render('index', {
					title: 'Friend Data',
					friends: friends
				});
			});

};

exports.friend = function (req, res) {

	var id = req.params.id;

	Friends.
		findOne(id).
		done(function (friend) {

			res.render('friend', {
				title: 'Friend Data',
				friend: friend
			});
		});

};