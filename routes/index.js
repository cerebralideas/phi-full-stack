
/*
 * GET home page.
 */

exports.plainHttpReq = function(req, res) {

	var http = require('http'),
		options = {
			hostname: '127.0.0.1',
			port: 8080,
			path: '/data.json',
			method: 'GET'
		},
		request = http.request(options, function(response) {
			console.log('STATUS: ' + response.statusCode);
			console.log('HEADERS: ' + JSON.stringify(response.headers));

			response.setEncoding('utf8');

			response.on('data', function (data) {
				var friendList = data;
				res.render('index', {
						title: 'Express',
						friends: friendList
					});
			});
		});

	request.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	request.end();
};

var httpPromise = require('../services/').httpPromise;

exports.index = function(req, res) {


	httpPromise.
			query('127.0.0.1', '/data.json').
			done(function(data) {

				res.render('index', {
					title: 'Friend Data',
					friends: data
				});
			});
};