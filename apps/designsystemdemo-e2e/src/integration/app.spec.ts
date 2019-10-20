import { getGreeting } from '../support/app.po';

describe('designsystemdemo', () => {
	beforeEach(() => cy.visit('/'));

	it('should display welcome message', () => {
		getGreeting().contains('Welcome to designsystemdemo!');
	});
});
