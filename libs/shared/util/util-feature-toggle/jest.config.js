module.exports = {
	name: 'shared-util-util-feature-toggle',
	preset: '../../../../jest.config.js',
	transform: {
		'^.+\\.[tj]sx?$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
	coverageDirectory:
		'../../../../coverage/libs/shared/util/util-feature-toggle',
};
