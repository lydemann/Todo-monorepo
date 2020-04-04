import { getGreeting as getHeading } from '../support/app.po';

describe('designsystemdemo', () => {
	beforeEach(() => cy.visit('/'));

	it('should display welcome message', () => {
		getHeading().contains('Design system demo');
	});
});
