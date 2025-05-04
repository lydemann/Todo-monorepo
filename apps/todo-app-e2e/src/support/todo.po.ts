import { todoList } from '../fixtures/todo-list';

export class TodoPage {
	public static goToPage() {
		cy.visit('/');
	}

	public static createTodoItem() {
		cy.get('[data-testid=todo-title]').type('Some name');
		cy.get('[data-testid=todo-description]').type('Some description');
		cy.get('[data-testid=todo-duedate]').type('2019-10-10');

		cy.get('[data-testid=create-todo-submit]').click();

		cy.get('[data-testid=todo-item]').should('have.length', 6);
	}

	static deleteTodoItem() {
		cy.get('[data-testid=todo-item]').should('have.length', 5);
		cy.get('[data-testid=todo-item]')
			.first()
			.find('[data-testid=delete-button]')
			.click();
		cy.get('[data-testid=todo-item]').should('have.length', 4);
		cy.contains(todoList[0].title).should('not.exist');
	}

	static editTodoItem() {
		cy.get('[data-testid=todo-item]').should('have.length', 5);
		cy.get('[data-testid=todo-item]')
			.first()
			.find('[data-testid=edit-button]')
			.click();
		cy.get('[data-testid=todo-title]').clear();
		cy.get('[data-testid=todo-title]').type('Edited name');
		cy.get('[data-testid=todo-description]').clear();
		cy.get('[data-testid=todo-description]').type('Some description');
		cy.get('[data-testid=todo-duedate]').clear();
		cy.get('[data-testid=todo-duedate]').type('2019-10-10');
		cy.get('[data-testid=create-todo-submit]').click();

		cy.get('[data-testid=todo-item]').should('have.length', 5);
	}

	public static checkForTodos() {
		cy.get('[data-testid=todo-item]').should('have.length', 5);
	}
}
