/*global module:false*/
module.exports = function(grunt) {

	"use strict";

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		concat: {
			main: {
				src: '',
				dest: '',
				separator: '\n\n;// End file\n\n'
			}
		},
		min: {
			dist: {
				src: '',
				dest: ''
			}
		},
		markdown: {
			all: {
				files: 'docs/md/*',
				dest: 'docs/html/',
				template: 'templates/markdown/html-partial-template.html'
			}
		},
		test: {
			unit: ['test/spec/**/*.js']
		},
		watch: {
			files: [
				'<%= jshint.files %>'
			],
			tasks: 'default'
		},
		jshint: {
			files: [
				'Gruntfile.js',
				'app.js',
				'routes/*.js'
			],
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				strict: true,
				devel: true,
				browser: true
			},
			globals: {
				jQuery: true,
				$: true,
				PHI: true,
				Modernizr: true,
				angular: true,
				require: true,
				define: true
			}
		},
		uglify: {},
		macreload: {
			reload: {
				browser: 'canary'
			}
		}
	});

	// Load in contrib task suite
	grunt.loadNpmTasks('grunt-contrib');

	// Load in Markdown task
	grunt.loadNpmTasks('grunt-markdown');

	// A Live Reload alternative
	grunt.loadNpmTasks('grunt-macreload');

	// Default dev tasks for grunt.
	grunt.registerTask('default', ['jshint', 'macreload']);

	// Production build task.
	grunt.registerTask('build', ['jshint', 'concat', 'min', 'markdown', 'macreload']);

};
