import { TodoPage } from '../support/todo.po';

describe('Todolist', () => {
	beforeEach(() => {
		cy.setupAppGlobalRoutes();
		TodoPage.goToPage();
	});

	it('should create todo item', () => {
		TodoPage.createTodoItem();
	});

	it('should edit todo item', () => {
		TodoPage.editTodoItem();
	});

	it('should delete todo item', () => {
		TodoPage.deleteTodoItem();
	});
});
