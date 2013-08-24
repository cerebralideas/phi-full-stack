
/*
 * Promise Http Request
 */

var Q = require('../node_modules/q');

exports.httpPromise = {

	query: function(hostname, path) {

				var http = require('q-io/http'),
					options = {
						hostname: hostname,
						port: 8080,
						path: path,
						method: 'GET'
					},
					request = http.request(options);

					return request.
							then(function(response) {
								var data,
									deffered = Q.defer();

								response.body.forEach(function(chunk) {
									data = chunk;
								});

								deffered.resolve(JSON.stringify(JSON.parse(data)));

								return deffered.promise;

							});
		}
	}
