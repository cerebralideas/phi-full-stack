
/**
 * This is the main JS script that runs the server.
 *
 * Require core modules
 * Instantiate the Express server
 * Require the config for Express
 * Require the config for Routes
 * Start the servers
 */

var Express = require('express'),   // This is the lightweight routing/rendering/templating framework
	http = require('http'),         // Obvious
	https = require('https'),       // Obvious
	passport = require('passport'), // This is the de-facto authentication module
	fs = require('fs'),             // File system module that allows for reading and writing to files
	env = process.env.NODE_ENV;     // Should return 'development' on local and 'production' on live server


/* TODO: This needs to be done to complete the SSL feature
// This line is from the Node.js HTTPS documentation.
var options = {
	key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
	cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
};
*/

// Create a new instance of Express
var app = new Express();

// Configure Express settings
require('./config/express')(app, passport);

// Configure Route settings
require('./config/routes')(app, passport);

// Unsecured server connection
http.createServer(app).listen(app.get('port'), function () {

	'use strict';

	console.log("Express server listening on port " + app.get('port'));

	/* TODO: This should be used to help secure this app
	// Strip user of access
	process.setgid();
	process.setuid();
	*/
});

/* TODO: This needs to be setup for HTTPS protocol
// Secured server connection
https.createServer(options, app).listen(app.get('securePort'), function () {

	'use strict';

	console.log("Express server listening on secure port " + app.get('securePort'));

	// TODO: This should be used to help secure this app
	// Strip user of access
	process.setgid();
	process.setuid();
});
*/