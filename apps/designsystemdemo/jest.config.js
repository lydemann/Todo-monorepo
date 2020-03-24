module.exports = {
	name: 'designsystemdemo',
	preset: '../../jest.config.js',
	coverageDirectory: '../../coverage/apps/designsystemdemo',
	snapshotSerializers: [
		'jest-preset-angular/build/AngularSnapshotSerializer.js',
		'jest-preset-angular/build/HTMLCommentSerializer.js',
	],
};
