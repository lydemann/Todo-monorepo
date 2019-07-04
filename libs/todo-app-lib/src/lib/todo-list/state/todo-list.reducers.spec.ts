import { TODOItem } from '@todo-app/shared/models/todo-item';
import { GenericAction } from '../../generic-action';
import {
	AddTodoItemSuccessAction,
	DeleteTodoItemAction,
	LoadTodoListAction,
	LoadTodoListFailedAction,
	ToggleCompleteTodoItemAction,
	UpdateTodoItemSuccessAction,
} from './todo-list.actions';
import { todoListInitState, todoListReducers } from './todo-list.reducers';

describe('TodoList reducer', () => {
	describe('default', () => {
		it('should return init state', () => {
			const noopAction = new GenericAction('noop' as any);
			const newState = todoListReducers(undefined, noopAction);

			expect(newState).toEqual(todoListInitState);
		});
	});

	describe('loadTodoItems', () => {
		it('should return isLoading true', () => {
			const loadTodoItemsAction = new LoadTodoListAction();
			const newState = todoListReducers(todoListInitState, loadTodoItemsAction);

			expect(newState.isLoading).toBe(true);
		});
	});

	describe('todoItemsLoadFailed', () => {
		it('should return isLoading false and error', () => {
			const error = new Error('http error');
			const loadTodoItemsAction = new LoadTodoListFailedAction(error);
			const newState = todoListReducers(todoListInitState, loadTodoItemsAction);

			expect(newState.isLoading).toBe(false);
			expect(newState.errors).toBe(error);
		});
	});

	describe('todoItemCreatedReducer', () => {
		it('should add new todo to todo list', () => {
			const newTodo = new TODOItem('new todo', 'this is new');
			const addTodoItemsAction = new AddTodoItemSuccessAction(newTodo);
			const newState = todoListReducers(todoListInitState, addTodoItemsAction);

			expect(newState.todos.length).toBe(1);
			expect(newState.todos[0]).toEqual({ ...newTodo });
		});
	});

	describe('todoItemDeletedReducer', () => {
		it('should delete todo from todo list', () => {
			const todoToDelete = 'todoToDelete';
			todoListInitState.todos = [new TODOItem('todoToDelete', '')];
			todoListInitState.todos[0].id = todoToDelete;

			expect(todoListInitState.todos.length).toBe(1);

			const deleteTodoItemAction = new DeleteTodoItemAction(todoToDelete);
			const newState = todoListReducers(
				todoListInitState,
				deleteTodoItemAction,
			);

			expect(newState.todos.length).toBe(0);
		});
	});

	describe('todoItemUpdatedReducer', () => {
		it('should update todo item', () => {
			const oldTodoItem = new TODOItem('todoToUpdate', '');
			oldTodoItem.id = 'todoToUpdate';
			todoListInitState.todos = [oldTodoItem];

			expect(todoListInitState.todos.length).toBe(1);

			const updatedTodo = { ...new TODOItem('todoToUpdate', 'new msg') };
			updatedTodo.id = oldTodoItem.id;
			const loadTodoItemsAction = new UpdateTodoItemSuccessAction(updatedTodo);
			const newState = todoListReducers(todoListInitState, loadTodoItemsAction);

			expect(newState.todos[0]).toEqual(updatedTodo);
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

			const loadTodoItemsAction = new ToggleCompleteTodoItemAction(
				oldTodoItem.id,
			);
			const newState = todoListReducers(todoListInitState, loadTodoItemsAction);

			expect(newState.todos[0].completed).toBe(true);
		});
	});
});
