module.exports = {
	name: 'shared-util-i18n',
	preset: '../../../../jest.config.js',
	coverageDirectory: '../../../../coverage/libs/shared/util/util-i18n',
	snapshotSerializers: [
		'jest-preset-angular/build/AngularSnapshotSerializer.js',
		'jest-preset-angular/build/HTMLCommentSerializer.js',
	],
};
