import { TodoPage } from '../support/todo.po';

describe('Todo', () => {
	beforeEach(() => {
		TodoPage.goToPage();
	});

	it('should should show todo items', () => {
		TodoPage.checkForTodos();
	});
});
