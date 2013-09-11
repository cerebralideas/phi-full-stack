var Q = require('q'),
	httpPromise = require('../services/http-promise');

var obj = function () {

	'use strict';

	return {

		attributes: {
			id: 'number',
			married: 'boolean',
			name: 'string',
			sons: [
				{
					name: 'string',
					age: 'number'
				}
			],
			daughters: [
				{
					name: 'string',
					age: 'number'
				}
			]
		},

		find: function () {

			return httpPromise.query('/');
		},

		findOne: function (id) {

			return httpPromise.query('/').
					then(function (friends) {

						var friend = JSON.parse(friends).
										friends.filter(function (friend) {

											return friend.id === parseInt(id, 10);
										}),

							deffered = new Q.defer();

						deffered.resolve(JSON.stringify(friend));

						return deffered.promise;
					});
		}
	};
};

module.exports = obj();