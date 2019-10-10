module.exports = {
	name: 'shared-data-access-logging',
	preset: '../../../../jest.config.js',
	transform: {
		'^.+\\.[tj]sx?$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html'],
	coverageDirectory: '../../../../coverage/libs/shared/util/data-access-logging',
};
