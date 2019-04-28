/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { TodoListService } from '@todo-app/core/todo-list/todo-list.service';
import { SpyHelper } from '@todo-app/helpers/spy-helper';
import { AddTodoService } from './add-todo.service';

describe('Service: AddTodo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddTodoService, SpyHelper.provideMagicalMock(TodoListService)]
    });
  });

  it('should ...', inject([AddTodoService], (service: AddTodoService) => {
    expect(service).toBeTruthy();
  }));
});
