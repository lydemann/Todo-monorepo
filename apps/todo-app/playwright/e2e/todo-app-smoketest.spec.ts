/* eslint-disable playwright/expect-expect */
/* eslint-disable @nx/enforce-module-boundaries */
import { test } from '@playwright/test';
import { TodoListPage } from 'libs/todo-app/feature/src/lib/todo-list/todo-list.page';

test.describe('TodoApp', () => {
	let todoListPage: TodoListPage;

	test.beforeEach(async ({ page }) => {
		todoListPage = new TodoListPage(page);
		await todoListPage.navigate();
	});

	test('should show todo item', async () => {
		await todoListPage.expectTodoItemVisible();
	});
});
