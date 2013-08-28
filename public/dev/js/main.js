/*! phi-full-stack | Version: 0.0.1 | Concatenated on 2013-08-28 */

(function () {

	'use strict';

	/************************************************************
	 * Load Javascripts Asynchronously **************************
	 ************************************************************/

		// Create global var for attaching PHI modules.
	window.PHI = {};

	requirejs.config({

		// Map out all "modules" to paths
		paths: {

			// Bower dependencies
			'jquery': '/vendor-bower/jquery/jquery.min',

			// UI/Ix jQuery framework
			'modal': '/phi/ui-ix/extensions/modals/modal',
			'tabs': '/phi/ui-ix/extensions/tabs/jquery.foundation.tabs',
			'alerts': '/phi/ui-ix/extensions/alerts/jquery.foundation.alerts',
			'core': '/phi/ui-ix/core/core'
		},

		// Declare all dependencies
		shim: {
			'modal': ['jquery'],
			'tabs': ['jquery'],
			'alerts': ['jquery'],
			'custom': ['jquery'],
			'core': ['jquery']
		}
	});

	// Load in jQuery plugins
	require(
			[],

			function () {

				angular.module('FRIENDS').controller('FriendsCtrlr', [

					'$scope', 'sectionData',

					function FriendsCtrlr($scope, sectionData) {
						$scope.friends = sectionData.friends;
					}
				]);

				angular.bootstrap(document, ['FRIENDS']);
			}
	);
}());
