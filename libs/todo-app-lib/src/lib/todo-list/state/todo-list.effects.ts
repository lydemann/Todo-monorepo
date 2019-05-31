import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { TodoListResourcesService } from '../resources/todo-list-resources.service';
import {
  LoadTodoListFailedAction,
  LoadTodoListSuccessAction,
  TodoListActionTypes
} from './todo-list.actions';

@Injectable()
export class TodoListEffects {
  @Effect()
  public loadTodoList$ = this.actions$.pipe(
    ofType(TodoListActionTypes.LoadTodoList),
    exhaustMap(() => this.todoListResourcesService.getTodos$()),
    map((todoList) => new LoadTodoListSuccessAction(todoList)),
    catchError((error: Error) => of(new LoadTodoListFailedAction(error)))
  );
  constructor(
    private actions$: Actions,
    private todoListResourcesService: TodoListResourcesService
  ) {}
}
