import { TodoItem } from '@todo-app/shared/models/todo-item';
import { GenericAction } from '../../generic-action';
import { TodoListActions } from './todo-list.actions';
import { TodoListState } from './todo-list.model';
import { todoListInitState, todoListReducers } from './todo-list.reducers';

describe('TodoList reducer', () => {
	let state: TodoListState;

	beforeEach(() => {
		state = {
			...todoListInitState,
		};
	});

	describe('default', () => {
		it('should return init state', () => {
			const noopAction = new GenericAction('noop' as any);
			const newState = todoListReducers(undefined, noopAction);

			expect(newState).toEqual(state);
		});
	});

	describe('getTodoListRequest', () => {
		it('should return isLoading true', () => {
			const loadTodoItemsAction = TodoListActions.getTodoListRequest();
			const newState = todoListReducers(state, loadTodoItemsAction);

			expect(newState.isLoading).toBe(true);
		});
	});

	describe('getTodoListFailed', () => {
		it('should return isLoading false and error', () => {
			const error = new Error('http error');
			const loadTodoItemsAction = TodoListActions.getTodoListFailed({ error });
			const newState = todoListReducers(state, loadTodoItemsAction);

			expect(newState.isLoading).toBe(false);
			expect(newState.errors).toBe(error);
		});
	});

	describe('addTodoItemReponse', () => {
		it('should add new todo to todo list', () => {
			const newTodo = new TodoItem('new todo', 'this is new');
			const addTodoItemsAction = TodoListActions.addTodoItemReponse({
				todoItem: newTodo,
			});
			const newState = todoListReducers(state, addTodoItemsAction);

			expect(newState.todos.length).toBe(1);
			expect(newState.todos[0]).toEqual({ ...newTodo });
		});
	});

	describe('todoItemDeletedReducer', () => {
		it('should delete todo from todo list', () => {
			const todoToDelete = 'todoToDelete';
			state.todos = [new TodoItem('todoToDelete', '')];
			state.todos[0].id = todoToDelete;

			expect(state.todos.length).toBe(1);

			const deleteTodoItemAction = TodoListActions.deleteTodoItem({
				todoItemId: todoToDelete,
			});
			const newState = todoListReducers(state, deleteTodoItemAction);

			expect(newState.todos.length).toBe(0);
		});
	});

	describe('updateTodoItemResponse', () => {
		it('should update todo item', () => {
			const oldTodoItem = new TodoItem('todoToUpdate', '');
			oldTodoItem.id = 'todoToUpdate';
			state.todos = [oldTodoItem];

			expect(state.todos.length).toBe(1);

			const updatedTodo = { ...new TodoItem('todoToUpdate', 'new msg') };
			updatedTodo.id = oldTodoItem.id;
			const updateTodoItemRequestAction = TodoListActions.updateTodoItemResponse(
				{
					todoItem: updatedTodo,
				},
			);
			const newState = todoListReducers(state, updateTodoItemRequestAction);

			expect(newState.todos[0]).toEqual(updatedTodo);
		});
	});

	describe('todoItemCompletedReducer', () => {
		it('should complete given todo item', () => {
			const oldTodoItem = new TodoItem('todoToUpdate', '');
			oldTodoItem.id = 'todoToUpdate';
			oldTodoItem.completed = false;
			state.todos = [oldTodoItem];

			expect(state.todos.length).toBe(1);
			expect(state.todos[0].completed).toBe(false);

			const loadTodoItemsAction = TodoListActions.toggleCompleteTodoItem({
				todoItemId: oldTodoItem.id,
			});
			const newState = todoListReducers(state, loadTodoItemsAction);

			expect(newState.todos[0].completed).toBe(true);
		});
	});
});
