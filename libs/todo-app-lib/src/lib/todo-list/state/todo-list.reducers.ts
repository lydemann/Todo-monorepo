import { createReducer, on } from '@ngrx/store';

import { TodoListActions } from './todo-list.actions';
import {
	todoListAdapter,
	todoListInitState,
	TodoListState,
} from './todo-list.model';

export const todoListReducer = createReducer<TodoListState>(
	todoListInitState,
	on(TodoListActions.getTodoListRequest, state => {
		return {
			...state,
			isLoading: true,
		};
	}),
	on(TodoListActions.getTodoListResponse, (state, { todoList }) => {
		return {
			...todoListAdapter.setAll(todoList, state),
			isLoading: false,
		};
	}),

	on(TodoListActions.getTodoListFailed, (state, { error }) => {
		return {
			...state,
			error,
			isLoading: false,
		};
	}),
	on(TodoListActions.updateTodoItemResponse, (state, { todoItem }) => {
		return {
			...todoListAdapter.upsertOne(todoItem, state),
			isLoading: false,
		};
	}),
	on(TodoListActions.addTodoItemReponse, (state, { todoItem }) => {
		return {
			...todoListAdapter.upsertOne(todoItem, state),
			isLoading: false,
		};
	}),
	on(TodoListActions.deleteTodoItem, (state, { todoItemId }) => {
		return {
			...todoListAdapter.removeOne(todoItemId, state),
			isLoading: false,
		};
	}),
	on(TodoListActions.toggleCompleteTodoItem, (state, action) => {
		const oldTodo = state.entities[action.todoItemId];
		const newTodoState = todoListAdapter.updateOne(
			{ id: action.todoItemId, changes: { completed: !oldTodo?.completed } },
			state,
		);
		return { ...newTodoState, isLoading: false };
	}),

	on(TodoListActions.selectTodoForEdit, (state, action) => {
		return { ...state, selectedTodoItemId: action.todoItem.id };
	}),
);
