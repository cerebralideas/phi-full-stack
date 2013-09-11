/**
 * This is the Express config script.
 *
 * Require needed modules
 * Set localization
 * Set view engine
 * Configure global settings
 * Set security settings
 * Set route module
 * Set fall through for 404
 * Set environment specific settings
 *
 * NOTE: For all the security things included below, including the absence of bodyParser()
 * see this url below for my collection of security measures for Express:
 *
 * https://gist.github.com/cerebrl/6487587
 */

var express = require('express'),   // Import the Express framework
	path = require('path'),         // Helps normalize/modify URI's
	i18n = require('i18n-2'),       // See details at https://github.com/jeresig/i18n-node-2
	helmet = require('helmet'),     // Module for securing headers: https://github.com/evilpacket/helmet
	root = path.normalize(__dirname + '/..'); // Caches root path

module.exports = function (app, passport) {

	'use strict';

	// LOCALIZATION
	// Set i18n config settings
	require('./i18n')(app, i18n, root);

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

		// This is mostly not needed, but it allows for more
		// of the HTTP verbs, rather than just GET and POST with
		// traditional form actions.
		app.use(express.methodOverride());

		/* TODO: This should be set, but causes issues
		// SECURITY
		// Lock down the security on this app
		app.use(helmet.csp());
		app.use(helmet.xframe());
		app.use(helmet.iexss());
		app.use(helmet.contentTypeOptions());
		app.use(helmet.cacheControl());
		*/

		/* NOT IN USE RIGHT NOW; USED FOR MONGODB
		// express/mongo session storage
		app.use(express.session({
			secret: 'MEAN',
			store: new mongoStore({
				url: config.db,
				collection: 'sessions'
			})
		}));
		*/

		/* TODO: Should we use this?
		// Prevent Cross-Site Request Forgery
		app.use(express.csrf());
		app.use(function (req, res, next) {
			res.locals.csrftoken = req.session._csrf;
			next();
		});
		*/

		/* TODO: We will use passport for authentication
		// Use passport session
		app.use(passport.initialize());
		app.use(passport.session());
		*/

		// EXPRESS ROUTES
		app.use(app.router);
	});

	// Dev specific configurations
	app.configure('development', function () {

		console.log(path.join(root, '_public/dev'));

		// set port
		app.set('port', 8888);
		app.set('securePort', 4430);

		// our exposed folder root is located at public/dev in development
		app.use(express.static(path.join(root, '_public/dev')));
		app.use(express.errorHandler());
	});


	// Production specific configurations
	app.configure('production', function () {

		console.log(path.join(root, '_public/dist'));

		// set port
		app.set('port', 80);
		app.set('securePort', 443);

		// our exposed folder root is located at public/dist in production
		app.use(express.static(path.join(root, '_public/dist')));
	});
};