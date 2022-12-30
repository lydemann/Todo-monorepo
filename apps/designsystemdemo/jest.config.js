module.exports = {
	name: 'designsystemdemo',
	preset: '../../jest.preset.js',
	coverageDirectory: '../../coverage/apps/designsystemdemo',
	snapshotSerializers: [
		'jest-preset-angular/build/AngularSnapshotSerializer.js',
		'jest-preset-angular/build/HTMLCommentSerializer.js',
	],
	reporters: [
		'default',
		['jest-junit', { outputDirectory: './junit/apps/designsystemdemo' }],
	],
};
