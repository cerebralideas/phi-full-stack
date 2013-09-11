module.exports = function (app, i18n, root) {

	'use strict';

	// i18n settings: https://github.com/jeresig/i18n-node-2

	i18n.expressBind(app, {

		locales: ['en', 'de'],
		directory: root + '/front-end/locales',
		extension: '.json'
	});
};
