
/**
 * This is the main JS script that runs the server.
 *
 * Require core modules
 * Instantiate the Express server
 * Require the config for Express
 * Require the config for Routes
 * Start the server
 */

var Express = require('express'),   // This is the lightweight routing/rendering/templating framework
	http = require('http'),         // Obvious
	fs = require('fs'),             // File system module that allows for reading and writing to files
	env = process.env.NODE_ENV || 'development';     // Should return 'development' on local and 'production' on live server

// Create a new instance of Express
var app = new Express();

// Configure Express settings
require('./config/express')(app);

// Configure Route settings
require('./config/routes')(app);

// Unsecured server connection
http.createServer(app).listen(app.get('port'), function () {

	'use strict';

	console.log("Express server listening on port " + app.get('port') + ' within a ' + env + ' environment.');
});