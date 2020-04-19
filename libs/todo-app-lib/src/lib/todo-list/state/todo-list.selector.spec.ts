import { TodoItem } from '@todo/shared/todo-interfaces';
import { TodoListState } from './todo-list.model';
import { todoListSelector } from './todo-list.selector';

describe('TodoListSelector', () => {
	describe('getTodoList', () => {
		it('should return the todoList', () => {
			const todos = [new TodoItem('todo1', 'todo1')];

			const todoListState = {
				todos,
				isLoading: true,
			} as TodoListState;

			expect(todoListSelector.projector(todoListState)).toEqual(todos);
		});
	});
});
