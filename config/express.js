/**
 * This is the Express config script.
 *
 * Require needed modules
 * Set view engine
 * Configure global settings
 * Set route module
 * Set environment specific settings
 *
 * NOTE: For all the security things included below, including the absence of bodyParser()
 * see this url below for my collection of security measures for Express:
 *
 * https://gist.github.com/cerebrl/6487587
 */

var express = require('express'),   // Import the Express framework
	path = require('path'),         // Helps normalize/modify URI's
	root = path.normalize(__dirname + '/..'); // Caches root path

module.exports = function (app) {

	'use strict';

	// GLOBAL CONFIGURATIONS
	app.configure(function () {

		// VIEW ENGINE
		// Set ejs as our view engine
		app.set('view engine', 'ejs');

		// Cookie parser should be above session
		app.use(express.cookieParser());

		// Use this instead of express.bodyParser(), which is not secure
		// If .multipart() is needed, use it explicitly where needed
		app.use(express.json());
		app.use(express.urlencoded());

		// Gzip everything
		app.use(express.compress());

		// Set views base path and engine
		app.set('views', root + '/middle-end/views');
		app.set('view engine', 'ejs');

		app.use(express.favicon());

		app.use(express.logger('dev'));

		// This allows for more of the HTTP verbs, rather than just
		// GET and POST with traditional form actions.
		app.use(express.methodOverride());

		// EXPRESS ROUTES
		app.use(app.router);
	});

	// Dev specific configurations
	app.configure('development', function () {

		console.log(path.join(root, '_public/dev'));

		// set port
		app.set('port', 8888);

		// our exposed folder root is located at public/dev in development
		app.use(express.static(path.join(root, '_public/dev')));
		app.use(express.errorHandler());
	});


	// Production specific configurations
	app.configure('production', function () {

		console.log(path.join(root, '_public/dist'));

		// set port
		app.set('port', 80);

		// our exposed folder root is located at public/dist in production
		app.use(express.static(path.join(root, '_public/dist')));
	});
};