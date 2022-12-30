module.exports = {
	name: 'shared-util-util-test',
	preset: '../../../../jest.preset.js',
	transform: {
		'^.+\\.[tj]sx?$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
	coverageDirectory: '../../../../coverage/libs/shared/util/util-test',
};
