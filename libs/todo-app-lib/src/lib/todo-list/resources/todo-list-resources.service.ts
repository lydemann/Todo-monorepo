import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TODOItem } from '@todo-app/shared/models/todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoListResourcesService {
  private todoListUrl = '//localhost:8080/api/todo-list';

  constructor(private httpClient: HttpClient) {}

  public getTodos$() {
    return this.httpClient.get<Array<TODOItem>>(this.todoListUrl);
  }
}
