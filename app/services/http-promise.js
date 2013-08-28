
/*
 * Promise Http Request
 */

var Q = require('q'),
	backend = require('../../config/backend');

module.exports = {

	query: function(path) {

		var http = require('q-io/http'),
			options = backend;

			options.path = path + '.json'

			request = http.request(options);

			return request.
					then(function (response) {
						var data,
							deffered = new Q.defer();

						response.body.forEach(function (chunk) {
							data = chunk;
						});

						deffered.resolve(JSON.stringify(JSON.parse(data)));

						return deffered.promise;
					});
		}
	}
