import { TodoItem } from '@todo/shared/todo-interfaces';
import { todoListInitState, TodoListState } from './todo-list.model';
import {
	selectCompletedTodos,
	selectIsAddingTodo,
	selectIsLoading,
	selectSelectedTodoItem,
	selectTodoList,
} from './todo-list.selector';

describe('Todo list selectors', () => {
	describe('selectTodoList', () => {
		it('should return the todoList', () => {
			const todos = [new TodoItem('todo1', 'todo1')];

			const todoListState = {
				todos,
				isLoading: true,
			} as TodoListState;

			expect(selectTodoList.projector(todoListState)).toEqual(todos);
		});
	});

	describe('selectCompletedTodos', () => {
		it('should return the completed todos', () => {
			const todos = [
				{ ...new TodoItem('todo1', 'todo1'), completed: true } as TodoItem,
				{ ...new TodoItem('todo2', 'todo2'), completed: false } as TodoItem,
			];

			expect(selectCompletedTodos.projector(todos)).toEqual(
				todos.filter(todo => todo.completed),
			);
		});
	});

	describe('selectIsLoading', () => {
		it('should select is loading', () => {
			const state = { isLoading: true } as TodoListState;
			expect(selectIsLoading.projector(state)).toBe(state.isLoading);
		});
	});

	describe('selectIsAddingTodo', () => {
		it('should select is adding todo', () => {
			const state = { isAddingTodo: true } as TodoListState;
			expect(selectIsAddingTodo.projector(state)).toBe(state.isAddingTodo);
		});
	});

	describe('selectSelectedTodoItem', () => {
		it('should select selected todo item', () => {
			const todos = [
				{ ...new TodoItem('todo1', 'todo1'), completed: true } as TodoItem,
				{ ...new TodoItem('todo2', 'todo2'), completed: false } as TodoItem,
			];
			const todoListState = {
				...todoListInitState,
				todos,
				selectedTodoItemId: todos[0].id,
			} as TodoListState;

			expect(selectSelectedTodoItem.projector(todoListState)).toBe(todos[0]);
		});
	});
});
