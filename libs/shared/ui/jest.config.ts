/* eslint-disable */

const esModules = [
	// 'msw',
	// 'msw/browser',
	// '@angular/core',
	// '@angular',
	// '@ngx-translate',
	// '@ngneat/spectator',
	// 'rxjs',
	// '@ngrx',
].join('|');

export default {
	displayName: 'shared-ui',
	preset: '../../../jest.preset.js',
	setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
	globals: {},
	coverageDirectory: '../../../coverage/apps/shared-ui',
	transform: {
		'^.+\\.(ts|mjs|js|html)$': [
			'jest-preset-angular',
			{
				tsconfig: '<rootDir>/tsconfig.spec.json',
				stringifyContentPathRegex: '\\.(html|svg)$',
			},
		],
	},
	transformIgnorePatterns: [
		'node_modules/(?!.*\\.mjs$)',
		`node_modules/(?!${esModules})`,
	],
	snapshotSerializers: [
		'jest-preset-angular/build/serializers/no-ng-attributes',
		'jest-preset-angular/build/serializers/ng-snapshot',
		'jest-preset-angular/build/serializers/html-comment',
	],
};
