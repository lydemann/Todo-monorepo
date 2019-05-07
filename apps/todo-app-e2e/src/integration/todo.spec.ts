import { TodoPage } from '../support/todo.po';

const todoList = [
  {
    id: 'task1',
    title: 'Do1',
    description: 'Remember to buy milk'
  },
  {
    id: 'task2',
    title: 'Do2',
    description: 'Remember to work out'
  }
];
describe('Todo', () => {
  beforeEach(() => {
    cy.server();
    cy.route('http://localhost:8080/api/todo-list', todoList);

    cy.visit('/');
  });

  it('should should show todo items', () => {
    TodoPage.checkForTodos(todoList);
  });
});
