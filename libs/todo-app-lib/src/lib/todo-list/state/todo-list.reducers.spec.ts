import { TODOItem } from '@todo-app/shared/models/todo-item';
import { GenericAction } from '../../generic-action';
import { TodoListActions } from './todo-list.actions';
import { todoListInitState, todoListReducers } from './todo-list.reducers';

describe('TodoList reducer', () => {
	describe('default', () => {
		it('should return init state', () => {
			const noopAction = new GenericAction('noop' as any);
			const newState = todoListReducers(undefined, noopAction);

			expect(newState).toEqual(todoListInitState);
		});
	});

	describe('getTodoListRequest', () => {
		it('should return isLoading true', () => {
			const loadTodoItemsAction = TodoListActions.getTodoListRequest();
			const newState = todoListReducers(todoListInitState, loadTodoItemsAction);

			expect(newState.isLoading).toBe(true);
		});
	});

	describe('getTodoListFailed', () => {
		it('should return isLoading false and error', () => {
			const error = new Error('http error');
			const loadTodoItemsAction = TodoListActions.getTodoListFailed({ error });
			const newState = todoListReducers(todoListInitState, loadTodoItemsAction);

			expect(newState.isLoading).toBe(false);
			expect(newState.errors).toBe(error);
		});
	});

	describe('addTodoItemReponse', () => {
		it('should add new todo to todo list', () => {
			const newTodo = new TODOItem('new todo', 'this is new');
			const addTodoItemsAction = TodoListActions.addTodoItemReponse({
				todoItem: newTodo,
			});
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

			const deleteTodoItemAction = TodoListActions.deleteTodoItem({
				todoItemId: todoToDelete,
			});
			const newState = todoListReducers(
				todoListInitState,
				deleteTodoItemAction,
			);

			expect(newState.todos.length).toBe(0);
		});
	});

	describe('updateTodoItemResponse', () => {
		it('should update todo item', () => {
			const oldTodoItem = new TODOItem('todoToUpdate', '');
			oldTodoItem.id = 'todoToUpdate';
			todoListInitState.todos = [oldTodoItem];

			expect(todoListInitState.todos.length).toBe(1);

			const updatedTodo = { ...new TODOItem('todoToUpdate', 'new msg') };
			updatedTodo.id = oldTodoItem.id;
			const updateTodoItemRequestAction = TodoListActions.updateTodoItemResponse(
				{
					todoItem: updatedTodo,
				},
			);
			const newState = todoListReducers(
				todoListInitState,
				updateTodoItemRequestAction,
			);

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

			const loadTodoItemsAction = TodoListActions.toggleCompleteTodoItem({
				todoItemId: oldTodoItem.id,
			});
			const newState = todoListReducers(todoListInitState, loadTodoItemsAction);

			expect(newState.todos[0].completed).toBe(true);
		});
	});
});
