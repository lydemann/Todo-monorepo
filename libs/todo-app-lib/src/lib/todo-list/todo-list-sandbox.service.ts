import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TODOItem } from '@todo-app/shared/models/todo-item';
import { Guid } from '@todo/shared/utils';
import { of } from 'rxjs';
import { delay, first, tap } from 'rxjs/operators';
import {
  AddTodoItemSuccessAction,
  DeleteTodoItemAction,
  LoadTodoList,
  SaveTodoItemStartedAction,
  SelectTodoForEditAction,
  ToggleCompleteTodoItemAction,
  UpdateTodoItemAction as UpdateTodoItemSuccessAction
} from './state/todo-list.actions';
import { TodoListState } from './state/todo-list.model';
import {
  completedTodosSelector,
  isLoadingSelector,
  selectedTodoItemSelector,
  todoListSelector
} from './state/todo-list.selector';

@Injectable({
  providedIn: 'root'
})
export class TodoListSandboxService {
  public isLoading$ = this.store.select(isLoadingSelector);
  public selectedTodo$ = this.store.select(selectedTodoItemSelector);
  public completedTodos$ = this.store.select(completedTodosSelector);

  public todoList$ = this.store.select(todoListSelector);

  constructor(private store: Store<TodoListState>) {}
  public todoCompletedToggled(todoId: string) {
    this.store.dispatch(new ToggleCompleteTodoItemAction(todoId));
  }
  public selectTodoForEdit(todoItem: TODOItem) {
    this.store.dispatch(new SelectTodoForEditAction(todoItem.id));
  }

  public save$(todoItem: TODOItem) {
    this.store.dispatch(new SaveTodoItemStartedAction());

    if (!!todoItem.id) {
      return this.updateTodo(todoItem).pipe(
        first(),
        tap(() => {
          this.store.dispatch(new UpdateTodoItemSuccessAction(todoItem));
        })
      );
    } else {
      return this.addTodoOnServer(todoItem).pipe(
        first(),
        tap(() => {
          todoItem.id = Guid.newGuid();
          this.store.dispatch(new AddTodoItemSuccessAction(todoItem));
        })
      );
    }
  }

  public addTodoOnServer(todo: TODOItem) {
    return of(null).pipe(delay(2000));
  }

  public updateTodo(todo: TODOItem) {
    return of(null).pipe(delay(2000));
  }

  /**
   * loadTodoList
   */
  public loadTodoList() {
    this.store.dispatch(new LoadTodoList());
  }

  /**
   * deleteTodo
   */
  public deleteTodo(id: string) {
    this.store.dispatch(new DeleteTodoItemAction(id));
  }
}
