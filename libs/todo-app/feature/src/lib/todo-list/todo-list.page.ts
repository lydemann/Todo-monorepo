import { expect, Page } from '@playwright/test';

export class TodoListPage {
	constructor(private page: Page) {}

	// Selectors
	private get todoItem() {
		return this.page.getByTestId('todo-item');
	}

	private get todoTitleInput() {
		return this.page.getByTestId('todo-title');
	}

	private get todoDescriptionInput() {
		return this.page.getByTestId('todo-description');
	}

	private get todoDueDateInput() {
		return this.page.getByTestId('todo-duedate').getByRole('textbox');
	}

	private get createTodoSubmitButton() {
		return this.page.getByTestId('create-todo-submit');
	}

	private get editButton() {
		return this.page.getByTestId('edit-button');
	}

	private get deleteButton() {
		return this.page.getByTestId('delete-button');
	}

	// Actions
	async navigate() {
		await this.page.goto('/');
	}

	async createTodo(title: string, description: string, dueDate: string) {
		await this.todoTitleInput.fill(title);
		await this.todoDescriptionInput.fill(description);
		await this.todoDueDateInput.fill(dueDate);
		await this.createTodoSubmitButton.click();
	}

	async editTodo(title: string, description: string, dueDate: string) {
		await this.editButton.first().click();
		await this.todoTitleInput.clear();
		await this.todoTitleInput.fill(title);
		await this.todoDescriptionInput.clear();
		await this.todoDescriptionInput.fill(description);
		await this.todoDueDateInput.clear();
		await this.todoDueDateInput.fill(dueDate);
		await this.createTodoSubmitButton.click();
	}

	async deleteTodo() {
		await this.deleteButton.first().click();
	}

	// Assertions
	async expectTodoItemVisible() {
		await expect(this.todoItem.first()).toBeVisible();
	}

	async expectTodoItemCount(count: number) {
		await expect(this.todoItem).toHaveCount(count);
	}

	async expectTodoItemNotVisible() {
		await expect(this.todoItem).toHaveCount(0);
	}

	async expectTodoItemContains(text: string) {
		await expect(this.todoItem.getByText(text).first()).toBeVisible();
	}

	async expectErrorMessageVisible(text: string) {
		await expect(this.page.getByText(text)).toBeVisible();
	}
}
