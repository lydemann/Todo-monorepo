/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TodoListResourcesService } from './todo-list-resources.service';

describe('Service: TodoListResources', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoListResourcesService]
    });
  });

  it('should ...', inject([TodoListResourcesService], (service: TodoListResourcesService) => {
    expect(service).toBeTruthy();
  }));
});
