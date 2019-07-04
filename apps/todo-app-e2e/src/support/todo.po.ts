export class TodoPage {
	public static interceptTodoListRequest(todoList: any[]) {
		cy.server();
		cy.route('http://localhost:8080/api/todo-list', todoList);
	}

	public static goToPage() {
		cy.visit('/');
	}

	public static checkForTodos(todoList: any[]) {
		todoList.forEach(todo => {
			cy.contains(todo.title);
		});
	}
}
