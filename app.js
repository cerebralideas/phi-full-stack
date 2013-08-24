
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	http = require('http'),
	path = require('path'),
	i18n = require('i18n'),
	engine = require('ejs-locals'),
	app = express(),
	srcDir = 'dev';

if(process.env.NODE_ENV === 'production') {
	srcDir = 'dist';
}

i18n.configure({
	locales:['en', 'de'],
	cookie: 'localecookie',
	directory: __dirname + '/src/locales'
});

i18n.setLocale('de');

app.engine('ejs', engine);

app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(i18n.init); 
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public/', srcDir)));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function() {

	console.log("Express server listening on port " + app.get('port'));
});
