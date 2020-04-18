module.exports = {
	name: 'questionnaire-app',
	preset: '../../jest.config.js',
	coverageDirectory: '../../coverage/apps/questionnaire-app',
	snapshotSerializers: [
		'jest-preset-angular/build/AngularSnapshotSerializer.js',
		'jest-preset-angular/build/HTMLCommentSerializer.js',
	],
	reporters: [
		'default',
		['jest-junit', { outputDirectory: './junit/apps/questionnaire-service' }],
	],
};
