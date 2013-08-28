
/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'),
	app = express();

// express settings
require('./config/express')(app);

// routes
require('./config/routes')(app);
// server
http.createServer(app).listen(app.get('port'), function () {

	console.log("Express server listening on port " + app.get('port'));
});
