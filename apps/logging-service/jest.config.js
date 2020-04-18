module.exports = {
	name: 'logging-service',
	preset: '../../jest.config.js',
	coverageDirectory: '../../coverage/apps/logging-service',
	reporters: [
		'default',
		['jest-junit', { outputDirectory: './junit/apps/logging-service' }],
	],
};
