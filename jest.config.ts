const { getJestProjects } = require('@nx/jest');

export default {
	preset: 'jest-preset-angular',
	setupFilesAfterEnv: ['<rootDir>/test-setup.ts'],
	globalSetup: 'jest-preset-angular/global-setup',
	projects: [...getJestProjects()],
};
