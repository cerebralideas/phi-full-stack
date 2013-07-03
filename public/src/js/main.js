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

			// Articles
			'showdown': '/vendor-bower/showdown/compressed/showdown',

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
	require(['showdown'], function() {

		angular.module('PHI', []);

		angular.module('PHI').controller('ArticleCtrlr', [

			'$scope',

			//Controler that handles the dual pane markdown editing on the article entry and edit
			
			function ArticleCtrlr($scope) {

				$scope.init = function() {
					var articleBody = document.getElementById('articleBody');
					$scope.articleMarkdown = articleBody.value;
					$scope.markdownConvert();
				};

				$scope.convertedMarkdown = '';
				$scope.markdownConvert = function() {
					var converter = new Showdown.converter();
					$scope.convertedMarkdown = converter.makeHtml($scope.articleMarkdown);
				};

			}]);

		angular.bootstrap(document, ['PHI']);

	});
}());
