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

	public static checkForTodos() {
		cy.get('[data-test=todo-item]').should('have.length', 5);
	}
}
