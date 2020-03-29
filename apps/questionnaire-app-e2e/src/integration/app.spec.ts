describe('questionnaire-app', () => {
	beforeEach(() => cy.visit('/'));

	it('should display welcome message', () => {
		cy.contains("What's your name?");
	});
});
