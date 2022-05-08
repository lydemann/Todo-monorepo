import { IS_ERROR_ACTION } from '@todo/shared/data-access-logging';
import { TodoListActions } from './todo-list.actions';

describe('Todo list actions', () => {
	describe('getTodoListResponse', () => {
		it('should create a get todo list response action', () => {
			const payload = { todoList: [] };
			const action = TodoListActions.getTodoListResponse(payload);

			expect(action.todoList).toBe(payload.todoList);
		});
	});

	describe('getTodoListFailed', () => {
		it('should create a get todo list failed action', () => {
			const error = {
				name: 'adfd',
			} as Error;
			const action = TodoListActions.getTodoListFailed({ error });

			expect(action.error).toBe(error);
			expect(action[IS_ERROR_ACTION]).toBe(true);
			expect(action.showNotification).toBe(true);
		});
	});
});
