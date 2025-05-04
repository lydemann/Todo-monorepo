import { test } from '@playwright/test';
import { TodoListPage } from './todo-list.page';
import { MOCK_TODO_ITEMS } from '@todo/todo-app/domain/mocks/handlers/todo-data';
// import { formatDate } from '@angular/common';

test.describe('TodoListComponent', () => {
	let todoListPage: TodoListPage;

	test.beforeEach(async ({ page }) => {
		todoListPage = new TodoListPage(page);
		await todoListPage.navigate();
	});

	test('should show todo item', async () => {
		const todoItem = MOCK_TODO_ITEMS[0];
		await todoListPage.expectTodoItemVisible();
		await todoListPage.expectTodoItemContains(todoItem.title);
		await todoListPage.expectTodoItemContains(todoItem.description);
		const formattedDueDate = '5/4/25';
		await todoListPage.expectTodoItemContains(formattedDueDate);
	});

	// test('should create todo item', async ({ page }) => {
	// 	const title = 'Some title';
	// 	const description = 'Some description';
	// 	const dueDate = new Date('2025-05-02').toLocaleDateString('en-US');

	// 	await todoListPage.createTodo(title, description, dueDate);

	// 	await todoListPage.expectTodoItemContains(title);
	// 	await todoListPage.expectTodoItemContains(description);
	// 	const formattedDueDate = '5/4/25';
	// 	await todoListPage.expectTodoItemContains(formattedDueDate);
	// });

	// test('should update todo item', async () => {
	// 	const todoItem = MOCK_TODO_ITEMS[0];
	// 	await todoListPage.expectTodoItemVisible();
	// 	await todoListPage.expectTodoItemContains(todoItem.title);
	// 	await todoListPage.expectTodoItemContains(todoItem.description);
	// 	const formattedDueDate = formatDate(todoItem.dueDate, 'shortDate', 'en-US');
	// 	await todoListPage.expectTodoItemContains(formattedDueDate);

	// 	const updatedTitle = 'Edited title';
	// 	const updatedDescription = 'Edited description';
	// 	const currentDate = new Date();
	// 	const updatedDueDate = new Date(
	// 		currentDate.setDate(currentDate.getDate() + 1),
	// 	).toLocaleDateString('en-US');

	// 	await todoListPage.editTodo(
	// 		updatedTitle,
	// 		updatedDescription,
	// 		updatedDueDate,
	// 	);

	// 	await todoListPage.expectTodoItemContains(updatedTitle);
	// 	await todoListPage.expectTodoItemContains(updatedDescription);
	// 	const updatedFormattedDueDate = formatDate(
	// 		updatedDueDate,
	// 		'shortDate',
	// 		'en-US',
	// 	);
	// 	await todoListPage.expectTodoItemContains(updatedFormattedDueDate);
	// });

	// test('should delete todo item', async () => {
	// 	const todoItem = MOCK_TODO_ITEMS[0];
	// 	await todoListPage.expectTodoItemVisible();
	// 	await todoListPage.expectTodoItemContains(todoItem.title);
	// 	await todoListPage.expectTodoItemContains(todoItem.description);

	// 	await todoListPage.deleteTodo();

	// 	await todoListPage.expectTodoItemNotVisible();
	// });
});
