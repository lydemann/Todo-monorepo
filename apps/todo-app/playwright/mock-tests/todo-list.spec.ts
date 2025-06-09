/* eslint-disable playwright/expect-expect */
/* eslint-disable @nx/enforce-module-boundaries */
import { Page, test } from '@playwright/test';
import { MOCK_TODO_ITEMS } from '@todo/todo-app/domain/mocks/handlers/todo-data';
import { MockScenario } from '@todo/todo-app/domain/mocks/scenarios';
import { TodoListPage } from 'libs/todo-app/feature/src/lib/todo-list/todo-list.page';
// import { formatDate } from '@angular/common';

const formatAsShortDate = (date: Date) => {
	return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear().toString().slice(-2)}`;
};

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
		const today = new Date();
		const formattedDueDate = formatAsShortDate(today);
		await todoListPage.expectTodoItemContains(formattedDueDate);
	});

	test('should show error message when get todo items fails', async ({
		page,
	}) => {
		await setMockScenarios(page, todoListPage, ['getTodoListBadReqest']);
		await todoListPage.expectTodoItemCount(0);
		await todoListPage.expectErrorMessageVisible('Something went wrong');
	});

	test('should create todo item', async () => {
		const title = 'Some title';
		const description = 'Some description';
		const dueDate = new Date('2025-05-02').toLocaleDateString('en-US');

		await todoListPage.createTodo(title, description, dueDate);

		await todoListPage.expectTodoItemContains(title);
		await todoListPage.expectTodoItemContains(description);
		const formattedDueDate = formatAsShortDate(new Date('2025-05-02'));
		await todoListPage.expectTodoItemContains(formattedDueDate);
	});

	test('should update todo item', async () => {
		const todoItem = MOCK_TODO_ITEMS[0];
		await todoListPage.expectTodoItemVisible();
		await todoListPage.expectTodoItemContains(todoItem.title);
		await todoListPage.expectTodoItemContains(todoItem.description);
		const formattedDueDate = formatAsShortDate(new Date(todoItem.dueDate));
		await todoListPage.expectTodoItemContains(formattedDueDate);

		const updatedTitle = 'Edited title';
		const updatedDescription = 'Edited description';
		const currentDate = new Date();
		const updatedDueDate = new Date(
			currentDate.setDate(currentDate.getDate() + 1),
		).toLocaleDateString('en-US');

		await todoListPage.editTodo(
			updatedTitle,
			updatedDescription,
			updatedDueDate,
		);

		await todoListPage.expectTodoItemContains(updatedTitle);
		await todoListPage.expectTodoItemContains(updatedDescription);
		const updatedFormattedDueDate = formatAsShortDate(new Date(updatedDueDate));
		await todoListPage.expectTodoItemContains(updatedFormattedDueDate);
	});

	test('should delete todo item', async () => {
		const todoItem = MOCK_TODO_ITEMS[0];
		await todoListPage.expectTodoItemVisible();
		await todoListPage.expectTodoItemContains(todoItem.title);
		await todoListPage.expectTodoItemContains(todoItem.description);

		await todoListPage.deleteTodo();

		await todoListPage.expectTodoItemCount(MOCK_TODO_ITEMS.length - 1);
	});

	test('should show error message when create todo item fails', async ({
		page,
	}) => {
		await setMockScenarios(page, todoListPage, ['postCreateTodoItemBadReqest']);

		const title = 'Some title';
		const description = 'Some description';
		const dueDate = new Date('2025-05-02').toLocaleDateString('en-US');

		await todoListPage.createTodo(title, description, dueDate);

		await todoListPage.expectTodoItemCount(MOCK_TODO_ITEMS.length);
		await todoListPage.expectErrorMessageVisible('Something went wrong');
	});

	test('should show error message when update todo item fails', async ({
		page,
	}) => {
		await setMockScenarios(page, todoListPage, ['postUpdateTodoItemBadReqest']);
		await todoListPage.editTodo('Some title', 'Some description', '2025-05-02');
		await todoListPage.expectTodoItemCount(MOCK_TODO_ITEMS.length);
		await todoListPage.expectErrorMessageVisible('Something went wrong');
	});

	test('should show error message when delete todo item fails', async ({
		page,
	}) => {
		await setMockScenarios(page, todoListPage, ['deleteTodoItemBadReqest']);
		await todoListPage.deleteTodo();
		await todoListPage.expectTodoItemCount(MOCK_TODO_ITEMS.length);
		await todoListPage.expectErrorMessageVisible('Something went wrong');
	});
});

async function setMockScenarios(
	page: Page,
	todoListPage: TodoListPage,
	enabledScenarios: MockScenario[],
) {
	await page.evaluate((enabledScenarios: MockScenario[]) => {
		const mockScenarios = enabledScenarios.reduce(
			(acc: Record<string, boolean>, scenario: MockScenario) => {
				acc[scenario] = true;
				return acc;
			},
			{},
		);
		localStorage.setItem('MOCK_SCENARIOS_KEY', JSON.stringify(mockScenarios));
	}, enabledScenarios);
	await todoListPage.navigate();
}
