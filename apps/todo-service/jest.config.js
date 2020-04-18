module.exports = {
	name: 'todo-service',
	preset: '../../jest.config.js',
	coverageDirectory: '../../coverage/apps/todo-service',
	reporters: [
		'default',
		['jest-junit', { outputDirectory: './junit/apps/todo-service' }],
	],
};
