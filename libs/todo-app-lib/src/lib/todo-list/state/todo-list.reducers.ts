import { createReducer, on } from '@ngrx/store';

import { ImmutableCollectionHelper } from '@todo/shared/util';
import { TodoListActions } from './todo-list.actions';
import { TodoListState } from './todo-list.model';

export const todoListInitState: TodoListState = {
	todos: [],
	isLoading: false,
	isSavingTodo: false,
};

const todoItemsLoadFailed = (
	lastState: TodoListState,
	action: ReturnType<typeof TodoListActions.getTodoListFailed>,
): TodoListState => {
	return {
		...lastState,
		errors: action.error,
		isLoading: false,
	};
};

const todoItemDeletedReducer = (
	lastState: TodoListState,
	action: ReturnType<typeof TodoListActions.deleteTodoItem>,
): TodoListState => {
	const deleteIdx = lastState.todos.findIndex(
		todo => todo.id === action.todoItemId,
	);
	const newTodos = ImmutableCollectionHelper.removeItem(
		lastState.todos,
		deleteIdx,
	);

	return { ...lastState, todos: newTodos, isLoading: false };
};
const UpdateTodoItemReducer = (
	lastState: TodoListState,
	action: ReturnType<typeof TodoListActions.updateTodoItemResponse>,
): TodoListState => {
	const updatedTodoIdx = lastState.todos.findIndex(
		todo => todo.id === action.todoItem.id,
	);

	const newTodos = ImmutableCollectionHelper.updateObjectInArray(
		lastState.todos,
		updatedTodoIdx,
		action.todoItem,
	);

	return {
		...lastState,
		todos: newTodos,
		selectedTodoItemId: null,
		isSavingTodo: false,
	};
};
const toggleTodoItemReducer = (
	lastState: TodoListState,
	action: ReturnType<typeof TodoListActions.toggleCompleteTodoItem>,
): TodoListState => {
	const index = lastState.todos.findIndex(
		todo => todo.id === action.todoItemId,
	);
	const oldTodo = lastState.todos[index];
	const newTodo = {
		...oldTodo,
		completed: !oldTodo.completed,
	};
	const newTodos = ImmutableCollectionHelper.updateObjectInArray(
		lastState.todos,
		index,
		newTodo,
	);

	return { ...lastState, todos: newTodos, isLoading: false };
};

const selectTodoForEditAReducer = (
	lastState: TodoListState,
	action: ReturnType<typeof TodoListActions.selectTodoForEdit>,
): TodoListState => {
	return { ...lastState, selectedTodoItemId: action.todoItem.id };
};

export const todoListReducers = createReducer(
	todoListInitState,
	on(TodoListActions.getTodoListRequest, state => {
		return {
			...state,
			isLoading: true,
		};
	}),
	on(TodoListActions.getTodoListResponse, (state, action) => {
		return {
			...state,
			todos: action.todoList,
			isLoading: false,
		};
	}),

	on(TodoListActions.getTodoListFailed, (state, action) => {
		return todoItemsLoadFailed(state, action);
	}),
	on(TodoListActions.addTodoItemReponse, (state, action) => {
		const newTodos = [...state.todos, { ...action.todoItem }];
		return {
			...state,
			todos: newTodos,
			isSavingTodo: false,
		};
	}),
	on(TodoListActions.addTodoItemFailed, (state, action) => {
		return {
			...state,
			isSavingTodo: false,
			errors: action.error,
		};
	}),

	on(TodoListActions.deleteTodoItem, (state, action) => {
		return todoItemDeletedReducer(state, action);
	}),

	on(TodoListActions.saveTodoItemRequest, (state, action) => {
		return {
			...state,
			isSavingTodo: true,
		};
	}),

	on(TodoListActions.updateTodoItemRequest, (state, action) => {
		return {
			...state,
		};
	}),

	on(TodoListActions.updateTodoItemResponse, (state, action) => {
		return UpdateTodoItemReducer(state, action);
	}),

	on(TodoListActions.updateTodoItemFailed, (state, action) => {
		return {
			...state,
			isSavingTodo: false,
		};
	}),

	on(TodoListActions.toggleCompleteTodoItem, (state, action) => {
		return toggleTodoItemReducer(state, action);
	}),

	on(TodoListActions.selectTodoForEdit, (state, action) => {
		return selectTodoForEditAReducer(state, action);
	}),
);

// TODO: add store freeze meta reducer
