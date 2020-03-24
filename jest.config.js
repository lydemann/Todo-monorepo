module.exports = {
	testMatch: ['**/+(*.)+(spec|test).+(ts|js)'],
	transform: {
		'^.+\\.(js|ts|html)$': 'ts-jest',
	},
	transformIgnorePatterns: ['/node_modules/(?!lodash-es)'],
	resolver: '@nrwl/jest/plugins/resolver',
	moduleFileExtensions: ['ts', 'js', 'html'],
	collectCoverage: true,
	coverageReporters: ['html', 'lcov', 'json', 'text'],
};
