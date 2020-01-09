module.exports = {
	name: 'questionnaire-app',
	preset: '../../jest.config.js',
	coverageDirectory: '../../coverage/apps/questionnaire-app',
	snapshotSerializers: [
		'jest-preset-angular/AngularSnapshotSerializer.js',
		'jest-preset-angular/HTMLCommentSerializer.js',
	],
};
