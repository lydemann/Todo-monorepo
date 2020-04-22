import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TodoListState } from './todo-list.model';

export const selectTodolistState = createFeatureSelector<TodoListState>(
	'todoList',
);

export const selectTodoList = createSelector(
	selectTodolistState,
	todoListState => todoListState.todos,
);

export const selectCompletedTodos = createSelector(
	selectTodoList,
	todos => todos.filter(todo => todo.completed),
);

export const selectIsLoading = createSelector(
	selectTodolistState,
	todoListState => todoListState.isLoading,
);

export const selectIsAddingTodo = createSelector(
	selectTodolistState,
	todoListState => todoListState.isAddingTodo,
);

export const selectSelectedTodoItem = createSelector(
	selectTodolistState,
	todoListState => {
		return todoListState.todos.find(
			todoItem => todoItem.id === todoListState.selectedTodoItemId,
		);
	},
);
