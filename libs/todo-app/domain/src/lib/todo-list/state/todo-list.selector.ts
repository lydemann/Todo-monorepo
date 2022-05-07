import { createFeatureSelector, createSelector } from '@ngrx/store';

import { todoListAdapter, TodoListState } from './todo-list.model';

export const selectTodolistState =
	createFeatureSelector<TodoListState>('todoList');

const { selectAll } = todoListAdapter.getSelectors();

export const selectTodoList = createSelector(selectTodolistState, selectAll);

export const selectCompletedTodos = createSelector(selectTodoList, todos =>
	todos.filter(todo => todo.completed),
);

export const selectIsLoading = createSelector(
	selectTodolistState,
	todoListState => todoListState.isLoading,
);

export const selectIsSavingTodo = createSelector(
	selectTodolistState,
	todoListState => todoListState.isAddingTodo,
);

export const selectSelectedTodoItem = createSelector(
	selectTodolistState,
	state => state.entities[state.selectedTodoItemId],
);
