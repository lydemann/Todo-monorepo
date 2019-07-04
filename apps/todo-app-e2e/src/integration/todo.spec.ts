import { TodoPage } from '../support/todo.po';

const todoList = [
	{
		id: 'task1',
		title: 'Do1',
		description: 'Remember to buy milk',
	},
	{
		id: 'task2',
		title: 'Do2',
		description: 'Remember to work out',
	},
];
describe('Todo', () => {
	beforeEach(() => {
		TodoPage.interceptTodoListRequest(todoList);

		TodoPage.goToPage();
	});

	it('should should show todo items', () => {
		TodoPage.checkForTodos(todoList);
	});
});
