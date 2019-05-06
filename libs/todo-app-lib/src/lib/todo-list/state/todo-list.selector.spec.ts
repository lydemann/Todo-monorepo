import { TODOItem } from '@todo-app/shared/models/todo-item';
import { TodoListState } from './todo-list.model';
import { todoListSelector } from './todo-list.selector';

describe('TodoListSelector', () => {
  describe('getTodoList', () => {
    it('should return the todoList', () => {
      const todos = [new TODOItem('todo1', 'todo1')];

      const todoListState = {
        todos: todos,
        isLoading: true
      } as TodoListState;

      expect(todoListSelector.projector(todoListState)).toEqual(todos);
    });
  });
});
