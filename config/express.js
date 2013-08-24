module.exports = function (app) {
	var express = require('express'),
		path = require('path'),
		i18n = require('i18n-2'),
		engine = require('ejs-locals'),
		rootPath = path.normalize(__dirname + '/..');

	// i18n config settings
	require('./i18n')(app, i18n, rootPath);

	// attach ejs as our view engine
	app.engine('ejs', engine);

	// shared configurations
	app.configure(function() {

		app.set('port', process.env.PORT || 3000);

		// gzip everything
		app.use(express.compress());

		// set views base path and engine
		app.set('views', rootPath + '/app/views');
		app.set('view engine', 'ejs');

		app.use(express.favicon());

		app.use(express.logger('dev'));

		app.use(express.bodyParser());
		app.use(express.methodOverride());

		app.use(app.router);

	});

	// dev specific configurations
	app.configure('development', function() {

		// our exposed folder root is located at public/dev in development
		app.use(express.static(path.join(rootPath, 'public/dev')));
		app.use(express.errorHandler());
	});


	// production specific configurations
	app.configure('production', function() {

		// our exposed folder root is located at public/dist in production
		app.use(express.static(path.join(rootPath, 'public/dist')));
	});

}
