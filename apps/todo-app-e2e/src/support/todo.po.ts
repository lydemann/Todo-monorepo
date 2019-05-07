export class TodoPage {
  public static checkForTodos(todoList: any[]) {
    todoList.forEach((todo) => {
      cy.contains(todo.title);
    });
  }
}
