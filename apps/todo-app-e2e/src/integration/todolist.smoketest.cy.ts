import { TodoPage } from '../support/todo.po';

describe('Todo', () => {
	beforeEach(() => {
		cy.setupAppGlobalRoutes();

		TodoPage.goToPage();
	});

	it('should should show todo items', () => {
		TodoPage.checkForTodos();
	});
});
