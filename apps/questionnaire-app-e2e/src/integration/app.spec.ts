import { getGreeting } from '../support/app.po';

describe('questionnaire-app', () => {
	beforeEach(() => cy.visit('/'));

	it('should display welcome message', () => {
		getGreeting().contains('Welcome to questionnaire-app!');
	});
});
