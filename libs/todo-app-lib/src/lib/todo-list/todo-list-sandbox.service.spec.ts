/* tslint:disable:no-unused-variable */

import { inject, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TodoListSandboxService } from './todo-list-sandbox.service';

describe('Service: TodoListSandboxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoListSandboxService, provideMockStore()]
    });
  });

  it('should ...', inject([TodoListSandboxService], (service: TodoListSandboxService) => {
    expect(service).toBeTruthy();
  }));
});
