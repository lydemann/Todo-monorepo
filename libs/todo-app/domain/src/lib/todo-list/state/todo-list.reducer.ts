import { createReducer, on } from '@ngrx/store';

import { TodoListActions, TodoListActionsUnion } from './todo-list.actions';
import {
	todoListAdapter,
	todoListInitState,
	TodoListState,
} from './todo-list.model';

export const todoListReducer = createReducer<
	TodoListState,
	TodoListActionsUnion
>(
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
	on(TodoListActions.updateTodoItemRequest, state => {
		return {
			...state,
			isAddingTodo: true,
		};
	}),
	on(TodoListActions.updateTodoItemResponse, (state, { todoItem }) => {
		return {
			...todoListAdapter.upsertOne(todoItem, state),
			isAddingTodo: false,
		};
	}),
	on(TodoListActions.updateTodoItemFailed, (state, { error }) => {
		return {
			...state,
			error,
			isAddingTodo: false,
		};
	}),
	on(TodoListActions.addTodoItemRequest, state => {
		return {
			...state,
			isAddingTodo: true,
		};
	}),
	on(TodoListActions.addTodoItemReponse, (state, { todoItem }) => {
		return {
			...todoListAdapter.upsertOne(todoItem, state),
			isAddingTodo: false,
		};
	}),
	on(TodoListActions.deleteTodoItem, (state, { todoItemId }) => {
		return {
			...todoListAdapter.removeOne(todoItemId, state),
			isAddingTodo: false,
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
