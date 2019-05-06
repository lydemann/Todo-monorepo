/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { TodoListSandboxService } from './todo-list-sandbox.service';

describe('Service: TodoList', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoListSandboxService]
    });
  });

  it('should ...', inject([TodoListSandboxService], (service: TodoListSandboxService) => {
    expect(service).toBeTruthy();
  }));
});
