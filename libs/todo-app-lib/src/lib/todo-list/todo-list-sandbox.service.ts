import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TODOItem } from '@todo-app/shared/models/todo-item';
import { first, tap } from 'rxjs/operators';
import { TodoListResourcesService } from './resources/todo-list-resources.service';
import {
  AddTodoItemSuccessAction,
  DeleteTodoItemAction,
  LoadTodoListAction,
  SaveTodoItemStartedAction,
  SelectTodoForEditAction,
  ToggleCompleteTodoItemAction,
  UpdateTodoItemSuccessAction
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

  constructor(
    private store: Store<TodoListState>,
    private todoListResourcesService: TodoListResourcesService
  ) {}
  public todoCompletedToggled(todoId: string) {
    this.store.dispatch(new ToggleCompleteTodoItemAction(todoId));
  }
  public selectTodoForEdit(todoItem: TODOItem) {
    this.store.dispatch(new SelectTodoForEditAction(todoItem.id));
  }

  public save$(todoItem: TODOItem) {
    this.store.dispatch(new SaveTodoItemStartedAction());

    if (!!todoItem.id) {
      return this.todoListResourcesService.updateTodo(todoItem).pipe(
        first(),
        tap((todoItm) => {
          this.store.dispatch(new UpdateTodoItemSuccessAction(todoItm));
        })
      );
    } else {
      return this.todoListResourcesService.addTodo(todoItem).pipe(
        first(),
        tap((todoItm) => {
          this.store.dispatch(new AddTodoItemSuccessAction(todoItm));
        })
      );
    }
  }

  /**
   * loadTodoList
   */
  public loadTodoList() {
    this.store.dispatch(new LoadTodoListAction());
  }

  /**
   * deleteTodo
   */
  public deleteTodo(id: string) {
    this.store.dispatch(new DeleteTodoItemAction(id));
  }
}
