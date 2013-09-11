/**
 * This is the Routes script that runs the URL scheme.
 *
 * Grab controller to use methods
 */

module.exports = function (app) {

	'use strict';

	var controllerPath = '../middle-end/controllers/',
		friends = require(controllerPath + 'ctrlr-friends');

	app.get('/', friends.index);
	app.get('/friends/:id', friends.friend);
};
