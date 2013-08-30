
/*
 * Promise Http Request
 */

var Q = require('q'),
	backend = require('../../config/backend');

module.exports = {

	query: function(path) {

		var http = require('q-io/http'),
			options = backend;

			options.path = path + '.json';

			return http.request(options).
					then(function (response) {
						var data;

						response.body.forEach(function (chunk) {
							data = chunk;
						});

						return Q.fcall(function() {
							return JSON.stringify(JSON.parse(data));
						});
					},
					function (error) {
						console.log(error);
					});
		}
	}
