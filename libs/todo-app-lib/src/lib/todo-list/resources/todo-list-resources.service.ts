import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TODOItem } from '@todo-app/shared/models/todo-item';
import { Guid } from '@todo/shared/utils';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoListResourcesService {
  private todoListUrl = '//localhost:8080/api/todo-list';

  constructor(private httpClient: HttpClient) {}

  public getTodos$() {
    return this.httpClient.get<Array<TODOItem>>(this.todoListUrl);
  }

  public addTodo(todo: TODOItem) {
    const todoWithId = {
      ...todo,
      id: Guid.newGuid()
    };
    return of(todoWithId).pipe(delay(2000));
  }

  public updateTodo(todo: TODOItem) {
    return of(todo).pipe(delay(2000));
  }
}
