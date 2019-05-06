import { TODOItem } from '@todo-app/shared/models/todo-item';
import { GenericAction } from 'libs/todo-app-lib/src/lib/generic-action';
import { TodoListActionTypes } from './todo-list.actions';
import { todoListInitState, todoListReducers } from './todo-list.reducers';

describe('TodoList reducer', () => {
  describe('default', () => {
    it('should return init state', () => {
      const noopAction = new GenericAction('noop' as TodoListActionTypes);
      const newState = todoListReducers(undefined, noopAction);

      expect(newState).toEqual(todoListInitState);
    });
  });

  describe('loadTodoItems', () => {
    it('should return isLoading true', () => {
      const loadTodoItemsAction = new GenericAction(TodoListActionTypes.LoadTodoList);
      const newState = todoListReducers(todoListInitState, loadTodoItemsAction);

      expect(newState.isLoading).toBe(true);
    });
  });

  describe('todoItemsLoadFailed', () => {
    it('should return isLoading false and error', () => {
      const error = new Error('http error');
      const loadTodoItemsAction = new GenericAction(TodoListActionTypes.LoadTodoListFailed, error);
      const newState = todoListReducers(todoListInitState, loadTodoItemsAction);

      expect(newState.isLoading).toBe(false);
      expect(newState.errors).toBe(error);
    });
  });

  describe('todoItemCreatedReducer', () => {
    it('should add new todo to todo list', () => {
      const newTodo = new TODOItem('new todo', 'this is new');
      const loadTodoItemsAction = new GenericAction(
        TodoListActionTypes.AddTodoItemSuccess,
        newTodo
      );
      const newState = todoListReducers(todoListInitState, loadTodoItemsAction);

      expect(newState.todos.length).toBe(1);
      expect(newState.todos[0]).toEqual(newTodo);
    });
  });

  describe('todoItemDeletedReducer', () => {
    it('should delete todo from todo list', () => {
      todoListInitState.todos = [new TODOItem('todoToDelete', '')];

      expect(todoListInitState.todos.length).toBe(1);

      const todoToDelete = 'todoToDelete';
      const loadTodoItemsAction = new GenericAction(
        TodoListActionTypes.DeleteTodoItem,
        todoToDelete
      );
      const newState = todoListReducers(todoListInitState, loadTodoItemsAction);

      expect(newState.todos.length).toBe(0);
    });
  });

  describe('todoItemUpdatedReducer', () => {
    it('should update todo item', () => {
      const oldTodoItem = new TODOItem('todoToUpdate', '');
      oldTodoItem.id = 'todoToUpdate';
      todoListInitState.todos = [oldTodoItem];

      expect(todoListInitState.todos.length).toBe(1);

      const updatedTodo = new TODOItem('todoToUpdate', 'new msg');
      updatedTodo.id = oldTodoItem.id;
      const loadTodoItemsAction = new GenericAction(
        TodoListActionTypes.UpdateTodoItem,
        updatedTodo
      );
      const newState = todoListReducers(todoListInitState, loadTodoItemsAction);

      expect(newState.todos[0]).toBe(updatedTodo);
    });
  });

  describe('todoItemCompletedReducer', () => {
    it('should complete given todo item', () => {
      const oldTodoItem = new TODOItem('todoToUpdate', '');
      oldTodoItem.id = 'todoToUpdate';
      oldTodoItem.completed = false;
      todoListInitState.todos = [oldTodoItem];

      expect(todoListInitState.todos.length).toBe(1);
      expect(todoListInitState.todos[0].completed).toBe(false);

      const loadTodoItemsAction = new GenericAction(
        TodoListActionTypes.ToggleCompleteTodoItem,
        oldTodoItem.id
      );
      const newState = todoListReducers(todoListInitState, loadTodoItemsAction);

      expect(newState.todos[0].completed).toBe(true);
    });
  });
});
