/* eslint-disable */
export default {
	name: 'todo-service',
	preset: '../../jest.preset.js',
	coverageDirectory: '../../coverage/apps/todo-service',
	reporters: [
		'default',
		['jest-junit', { outputDirectory: './junit/apps/todo-service' }],
	],
};
