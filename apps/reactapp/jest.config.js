module.exports = {
	name: 'reactapp',
	preset: '../../jest.preset.js',
	transform: {
		'^.+\\.[tj]sx?$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
	coverageDirectory: '../../coverage/apps/reactapp',
	reporters: [
		'default',
		['jest-junit', { outputDirectory: './junit/apps/reactapp' }],
	],
};
