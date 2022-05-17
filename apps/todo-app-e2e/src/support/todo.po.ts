import { todoList } from '../fixtures/todo-list';

export class TodoPage {
	public static goToPage() {
		cy.visit('/');
	}

	public static createTodoItem() {
		cy.get('[data-test=todo-title]').type('Some name');
		cy.get('[data-test=todo-description]').type('Some description');
		cy.get('[data-test=todo-duedate]').type('2019-10-10');

		cy.get('[data-test=create-todo-submit]').click();

		cy.get('[data-test=todo-item]').should('have.length', 6);
	}

	static deleteTodoItem() {
		cy.get('[data-test=todo-item]').should('have.length', 5);
		cy.get('[data-test=todo-item]')
			.first()
			.shadow()
			.find('[data-test=delete-button]')
			.click();
		cy.get('[data-test=todo-item]').should('have.length', 4);
		cy.contains(todoList[0].title).should('not.exist');
	}

	static editTodoItem() {
		cy.get('[data-test=todo-item]').should('have.length', 5);
		cy.get('[data-test=todo-item]')
			.first()
			.shadow()
			.find('[data-test=edit-button]')
			.click();
		cy.get('[data-test=todo-title]').clear().type('Edited name');
		cy.get('[data-test=todo-description]').clear().type('Some description');
		cy.get('[data-test=todo-duedate]').clear().type('2019-10-10');
		cy.get('[data-test=create-todo-submit]').click();

		cy.get('[data-test=todo-item]').should('have.length', 5);
	}

	public static checkForTodos() {
		cy.get('[data-test=todo-item]').should('have.length', 5);
	}
}
