import { getGreeting } from '../support/app.po';

describe('reactapp', () => {
	beforeEach(() => cy.visit('/'));

	it('should display welcome message', () => {
		getGreeting().contains('Welcome to React Todo App');
	});
});
