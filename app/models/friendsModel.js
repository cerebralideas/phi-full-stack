var Q = require('q'),
	httpPromise = require('../services/http-promise');

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

	find: function () {

		return httpPromise.query('/friends');
	},

	findOne: function (id) {

		return httpPromise.query('/friends').
					then(function (friends) {
						var friend = JSON.parse(friends).
										friends.filter(function (friend) {
											return friend.id == id;
										}),
							deffered = new Q.defer();

						deffered.resolve(JSON.stringify(friend));
						return deffered.promise;
					});
	}
}