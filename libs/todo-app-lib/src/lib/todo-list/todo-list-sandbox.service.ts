import { Injectable } from '@angular/core';
import { TodoListActions } from './redux-api/todo-list.actions';
import { TodoListSelector } from './redux-api/todo-list.selector';

@Injectable({
  providedIn: 'root'
})
export class TodoListSandboxService {
  public todoList$ = this.todoListSelector.getTodoList();

  constructor(
    private todoListSelector: TodoListSelector,
    private todoListActions: TodoListActions
  ) {}

  /**
   * loadTodoList
   */
  public loadTodoList() {
    this.todoListActions.loadTodoList();
  }

  /**
   * deleteTodo
   */
  public deleteTodo(id: string) {
    this.todoListActions.deleteTodo(id);
  }
}
