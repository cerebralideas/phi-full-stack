var http = require('http'),
	fs = require('fs');

http.createServer(function (req, res) {

	console.log('Connection from client!');

	res.writeHead(200, {'Content-Type': 'text/json'});

	fs.readFile('friends.json', function (err, data) {

		console.log(JSON.stringify(JSON.parse(data)));
		res.end(JSON.stringify(JSON.parse(data)));
	});
}).listen(9999);

console.log('Server is running on port: ' + 9999);
