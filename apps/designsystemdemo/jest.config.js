module.exports = {
	name: 'designsystemdemo',
	preset: '../../jest.config.js',
	coverageDirectory: '../../coverage/apps/designsystemdemo',
	snapshotSerializers: [
		'jest-preset-angular/AngularSnapshotSerializer.js',
		'jest-preset-angular/HTMLCommentSerializer.js',
	],
};
