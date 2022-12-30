/* eslint-disable */
export default {
	name: 'logging-service',
	preset: '../../jest.preset.js',
	coverageDirectory: '../../coverage/apps/logging-service',
	reporters: [
		'default',
		['jest-junit', { outputDirectory: './junit/apps/logging-service' }],
	],
};
