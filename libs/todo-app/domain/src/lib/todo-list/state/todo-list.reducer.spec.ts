import { TodoItem } from '@todo/shared/todo-interfaces';
import { GenericAction } from '../../generic-action';
import { TodoListActions } from './todo-list.actions';
import {
	todoListAdapter,
	todoListInitState,
	TodoListState,
} from './todo-list.model';
import { todoListReducer } from './todo-list.reducer';

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
			const newState = todoListReducer(undefined, noopAction);

			expect(newState).toEqual(state);
		});
	});

	describe('getTodoListRequest', () => {
		it('should return isLoading true', () => {
			const loadTodoItemsAction = TodoListActions.getTodoListRequest();
			const newState = todoListReducer(state, loadTodoItemsAction);

			expect(newState.isLoading).toBe(true);
		});
	});

	describe('getTodoListFailed', () => {
		it('should return isLoading false and error', () => {
			const error = new Error('http error');
			const loadTodoItemsAction = TodoListActions.getTodoListFailed({ error });
			const newState = todoListReducer(state, loadTodoItemsAction);

			expect(newState.isLoading).toBe(false);
			expect(newState.error).toEqual(error);
		});
	});

	describe('addTodoItemReponse', () => {
		it('should add new todo to todo list', () => {
			const newTodo = new TodoItem('new todo', 'this is new');
			const addTodoItemsAction = TodoListActions.addTodoItemReponse({
				todoItem: newTodo,
			});
			const newState = todoListReducer(state, addTodoItemsAction);

			expect(newState.ids.length).toBe(1);
			expect(newState.entities[newTodo.id]).toEqual(newTodo);
		});
	});

	describe('todoItemDeletedReducer', () => {
		it('should delete todo from todo list', () => {
			const todoToDelete = 'todoToDelete';
			const todoItemToDelete = {
				...new TodoItem('todoToDelete', ''),
				id: todoToDelete,
			} as TodoItem;
			state = todoListAdapter.setAll([todoItemToDelete], state);

			expect(state.ids.length).toBe(1);

			const deleteTodoItemAction = TodoListActions.deleteTodoItem({
				todoItemId: todoToDelete,
			});
			const newState = todoListReducer(state, deleteTodoItemAction);

			expect(newState.ids.length).toBe(0);
		});
	});

	describe('updateTodoItemResponse', () => {
		it('should update todo item', () => {
			const oldTodoItem = new TodoItem('todoToUpdate', '');
			oldTodoItem.id = 'todoToUpdate';
			state = todoListAdapter.setAll([oldTodoItem], state);

			expect(state.ids.length).toBe(1);

			const updatedTodo = { ...new TodoItem('todoToUpdate', 'new msg') };
			updatedTodo.id = oldTodoItem.id;
			const updateTodoItemRequestAction =
				TodoListActions.updateTodoItemResponse({
					todoItem: updatedTodo,
				});
			const newState = todoListReducer(state, updateTodoItemRequestAction);

			expect(newState.entities[updatedTodo.id]).toEqual(updatedTodo);
		});
	});

	describe('todoItemCompletedReducer', () => {
		it('should complete given todo item', () => {
			const oldTodoItem = new TodoItem('todoToUpdate', '');
			oldTodoItem.id = 'todoToUpdate';
			oldTodoItem.completed = false;
			state = todoListAdapter.setAll([oldTodoItem], state);

			expect(state.ids.length).toBe(1);
			expect(state.entities[oldTodoItem.id].completed).toBe(false);

			const loadTodoItemsAction = TodoListActions.toggleCompleteTodoItem({
				todoItemId: oldTodoItem.id,
			});
			const newState = todoListReducer(state, loadTodoItemsAction);

			expect(newState.entities[oldTodoItem.id].completed).toBe(true);
		});
	});
});
