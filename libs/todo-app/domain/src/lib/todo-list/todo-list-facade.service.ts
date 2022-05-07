import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { TodoItem } from '@todo/shared/todo-interfaces';
import { TodoListActions } from './state/todo-list.actions';
import { TodoListState } from './state/todo-list.model';
import {
	selectCompletedTodos,
	selectIsLoading,
	selectIsSavingTodo,
	selectSelectedTodoItem,
	selectTodoList,
} from './state/todo-list.selector';

@Injectable({
	providedIn: 'root',
})
export class TodoListFacadeService {
	public isLoading$ = this.store.select(selectIsLoading);
	public selectedTodo$ = this.store.select(selectSelectedTodoItem);
	public completedTodos$ = this.store.select(selectCompletedTodos);
	public isSavingTodo$ = this.store.select(selectIsSavingTodo);
	public todoList$ = this.store.select(selectTodoList);

	constructor(private store: Store<TodoListState>) {}
	public todoCompletedToggled(todoId: string) {
		this.store.dispatch(
			TodoListActions.toggleCompleteTodoItem({ todoItemId: todoId }),
		);
	}
	public selectTodoForEdit(todoItem: TodoItem) {
		this.store.dispatch(TodoListActions.selectTodoForEdit({ todoItem }));
	}

	public saveTodoItem(todoItem: TodoItem) {
		this.store.dispatch(
			TodoListActions.saveTodoItemRequest({
				todoItem: {
					...todoItem,
				},
			}),
		);
	}

	/**
	 * loadTodoList
	 */
	public loadTodoList() {
		this.store.dispatch(TodoListActions.getTodoListRequest());
	}

	/**
	 * deleteTodo
	 */
	public deleteTodo(id: string) {
		this.store.dispatch(TodoListActions.deleteTodoItem({ todoItemId: id }));
	}
}
