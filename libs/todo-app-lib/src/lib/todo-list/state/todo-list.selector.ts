import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TodoListState } from './todo-list.model';

export const getTodolistState = createFeatureSelector<TodoListState>(
	'todoList',
);

export const todoListSelector = createSelector(
	getTodolistState,
	todoListState => todoListState.todos,
);

export const completedTodosSelector = createSelector(
	todoListSelector,
	todos => todos.filter(todo => todo.completed),
);

export const isLoadingSelector = createSelector(
	getTodolistState,
	todoListState => todoListState.isLoading,
);

export const selectedTodoItemSelector = createSelector(
	getTodolistState,
	todoListState => {
		return todoListState.todos.find(
			todoItem => todoItem.id === todoListState.selectedTodoItemId,
		);
	},
);
