/*global module:false*/
module.exports = function(grunt) {

	"use strict";

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		clean: {
			dev: 'public/dev',
			prod: 'public/dist'
		},
		copy: {
			src: [
				'favicons/**/*',
				'fonts/**/*',
				'img/**/*',
				'vendor-bower/**/*.js',
				'vendor-manual/**/*.js',
				'phi/ui-ix/**/*.js',
				'phi/ui-ix/img/**/*'
			],
			dev: {
				src: '<%= copy.src %>',
				dest: 'public/dev',
				expand: true,
				cwd: './src'
			},
			prod: {
				src: '<%= copy.src %>',
				dest: 'public/dist',
				expand: true,
				cwd: './src'
			}
		},
		concat: {
			options: {
				banner: '/*! <%= pkg.name %> | Version: <%= pkg.version %> | ' +
						'Concatenated on <%= grunt.template.today("yyyy-mm-dd") %> */\n\n',
				separator: '\n\n;// End of file\n\n'
			},
			main: {
				src: 'src/js/*.js',
				dest: 'public/dev/js/main.js'
			}
		},
		watch: {
			js: {
				files: '<%= jshint.files %>',
				tasks: ['jshint', 'concat', 'macreload']
			},
			scss: {
				files: 'src/sass/*.scss',
				tasks: ['compass:dev', 'macreload']
			}
		},
		jshint: {
			files: [
				'Gruntfile.js',
				'src/js/**/*.js'
			],
			options: {
				jshintrc: '.jshintrc' // Retrieves .jshintrc file from public/ See jshintrcExplained.js for more details
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> | Version: <%= pkg.version %> | ' +
						'Minified on <%= grunt.template.today("yyyy-mm-dd") %> */\n\n'
			},
			prod: {
				expand: true,     // Enable dynamic expansion.
				cwd: 'public/dev/js',      // Src matches are relative to this path.
				src: ['**/*.js'], // Actual pattern(s) to match.
				dest: 'public/dist/js',    // Destination path prefix.
				ext: '.js',       // Dest filepaths will have this extension.
				flatten: false    // Remove directory structure in destination
			}
		},
		compass: {
			prod: {
				options: {
					sassDir: 'src/sass',
					cssDir: 'public/dist/css',
					environment: 'production'
				}
			},
			dev: {
				options: {
					sassDir: 'src/sass',
					cssDir: 'public/dev/css'
				}
			}
		},
		macreload: {
			reload: {
				browser: 'canary'
			}
		},
		jasmine: {
			src: 'test/*helper.js',
			options: {
				specs: 'test/spec/*.spec.js'
			}
		}
	});

	// Load in contrib tasks
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jasmine');

	// Load in Markdown task
	//grunt.loadNpmTasks('grunt-markdown');

	// Load the "Live Reload" alternative
	grunt.loadNpmTasks('grunt-macreload');

	// Test JS Code
	grunt.registerTask('test', ['jshint', 'jasmine']);

	// Default dev tasks for grunt.
	grunt.registerTask('default', ['test', 'clean:dev', 'concat',  'copy:dev', 'compass:dev' ]);//'macreload'

	// Production build task.
	grunt.registerTask('build', ['test', 'clean:prod', 'concat', 'copy:prod', 'uglify', 'compass:prod']);

};
