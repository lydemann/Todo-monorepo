import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { TodoListResourcesService } from '../resources/todo-list-resources.service';
import { TodoListActions } from './todo-list.actions';

@Injectable()
export class TodoListEffects {
	public getTodoListRequest$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TodoListActions.getTodoListRequest),
			exhaustMap(() =>
				this.todoListResourcesService.getTodos().pipe(
					map(todoList => TodoListActions.getTodoListResponse({ todoList })),
					catchError((error: Error) =>
						of(TodoListActions.getTodoListFailed({ error })),
					),
				),
			),
		),
	);

	public saveTodoItemRequest$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TodoListActions.saveTodoItemRequest),
			map(action => {
				if (action.todoItem.id) {
					return TodoListActions.updateTodoItemRequest({
						todoItem: action.todoItem,
					});
				} else {
					return TodoListActions.addTodoItemRequest({
						todoItem: action.todoItem,
					});
				}
			}),
		),
	);

	public updateTodoItemRequest$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TodoListActions.updateTodoItemRequest),
			exhaustMap(action =>
				this.todoListResourcesService.updateTodoItem(action.todoItem).pipe(
					map(todoItm => {
						return TodoListActions.updateTodoItemResponse({
							todoItem: todoItm,
						});
					}),
					catchError(error =>
						of(TodoListActions.updateTodoItemFailed({ error })),
					),
				),
			),
		),
	);

	public addTodoItemRequest$ = createEffect(() =>
		this.actions$.pipe(
			ofType(TodoListActions.addTodoItemRequest),
			exhaustMap(action =>
				this.todoListResourcesService.addTodoItem(action.todoItem).pipe(
					map(todoItm => {
						return TodoListActions.addTodoItemReponse({ todoItem: todoItm });
					}),
					catchError(error => of(TodoListActions.addTodoItemFailed({ error }))),
				),
			),
		),
	);

	constructor(
		private actions$: Actions,
		private todoListResourcesService: TodoListResourcesService,
	) {}
}
