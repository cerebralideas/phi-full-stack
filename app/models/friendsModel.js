var Q = require('q');
var httpPromise = require('../services/http-promise');

module.exports = {

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

	find: function() {

		return httpPromise.query('127.0.0.1', '/friends.json');
	},

	findOne: function(id) {
		return httpPromise.query('127.0.0.1', '/friends.json').
					then(function(friends) {
						var friend = JSON.parse(friends).
										friends.filter(function(friend) {
											return friend.id == id;
										}),
							deffered = new Q.defer();

						deffered.resolve(JSON.stringify(friend));
						return deffered.promise;
					});
		//return httpPromise.query('127.0.0.1', '/friends-1.json');
	}
}