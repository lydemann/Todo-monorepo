// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

const { join } = require('path');
const { constants } = require('karma');

module.exports = () => ({
	basePath: '',
	frameworks: ['jasmine', '@angular-devkit/build-angular'],
	plugins: [
		require('karma-jasmine'),
		require('karma-chrome-launcher'),
		require('karma-jasmine-html-reporter'),
		require('karma-coverage-istanbul-reporter'),
		require('karma-mocha-reporter'),
		require('@angular-devkit/build-angular/plugins/karma'),
	],
	client: {
		clearContext: false, // leave Jasmine Spec Runner output visible in browser
	},
	coverageIstanbulReporter: {
		dir: join(__dirname, '../coverage'),
		reports: ['html', 'lcovonly', 'json', 'text-summary'],
		fixWebpackSourcePaths: true,
		thresholds: {
			emitWarning: false,
			// thresholds for all files
			// there is currently a problem with false positives on branch coverage: https://github.com/angular/angular-cli/issues/5871
			global: {
				statements: 80,
				lines: 80,
				functions: 80,
			},
		},
	},
	reporters: ['progress', 'kjhtml'],
	port: 9876,
	colors: true,
	logLevel: constants.LOG_INFO,
	autoWatch: true,
	browsers: ['Chrome'],
	singleRun: true,
});
