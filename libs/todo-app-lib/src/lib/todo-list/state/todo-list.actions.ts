import { Action } from '@ngrx/store';
import { TODOItem } from '@todo-app/shared/models/todo-item';

export enum TodoListActionTypes {
  LoadTodoList = '[TodoList] Load Todo List',
  LoadTodoListSuccess = '[TodoList] Load Todo List Success',
  LoadTodoListFailed = '[TodoList] Load Todo List Failed',
  AddTodoItemSuccess = '[TodoList] Add Todo Item Success',
  DeleteTodoItem = '[TodoList] Delete Todo Item',
  UpdateTodoItemSuccess = '[TodoList] Update Todo Item success',
  SaveTodoItemStarted = '[TodoList] Save Todo Item Started',
  ToggleCompleteTodoItem = '[TodoList] Toggle Complete Todo Item',
  SelectTodoForEdit = '[TodoList] Select Todo For Edit'
}

export class LoadTodoListAction implements Action {
  public readonly type = TodoListActionTypes.LoadTodoList;

  constructor() {}
}

export class LoadTodoListSuccessAction implements Action {
  public readonly type = TodoListActionTypes.LoadTodoListSuccess;

  constructor(public payload: TODOItem[]) {}
}

export class LoadTodoListFailedAction implements Action {
  public readonly type = TodoListActionTypes.LoadTodoListFailed;

  constructor(public payload: Error) {}
}

export class AddTodoItemSuccessAction implements Action {
  public readonly type = TodoListActionTypes.AddTodoItemSuccess;

  constructor(public payload: TODOItem) {}
}

export class DeleteTodoItemAction implements Action {
  public readonly type = TodoListActionTypes.DeleteTodoItem;

  constructor(public payload: string) {}
}

export class SaveTodoItemStartedAction implements Action {
  public readonly type = TodoListActionTypes.SaveTodoItemStarted;

  constructor() {}
}

export class UpdateTodoItemSuccessAction implements Action {
  public readonly type = TodoListActionTypes.UpdateTodoItemSuccess;

  constructor(public payload: TODOItem) {}
}

export class ToggleCompleteTodoItemAction implements Action {
  public readonly type = TodoListActionTypes.ToggleCompleteTodoItem;

  constructor(public payload: string) {}
}

export class SelectTodoForEditAction implements Action {
  public readonly type = TodoListActionTypes.SelectTodoForEdit;

  constructor(public payload: string) {}
}

export type TodoListActions =
  | LoadTodoListAction
  | LoadTodoListSuccessAction
  | LoadTodoListFailedAction
  | AddTodoItemSuccessAction
  | DeleteTodoItemAction
  | SaveTodoItemStartedAction
  | UpdateTodoItemSuccessAction
  | ToggleCompleteTodoItemAction
  | SelectTodoForEditAction;
