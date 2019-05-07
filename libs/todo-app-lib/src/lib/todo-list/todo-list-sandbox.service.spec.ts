import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { TODOItem } from '@todo-app/shared/models/todo-item';
import { createMagicalMock } from '@todo/shared/utils';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { TodoListResourcesService } from './resources/todo-list-resources.service';
import {
  AddTodoItemSuccessAction,
  SaveTodoItemStartedAction,
  UpdateTodoItemSuccessAction
} from './state/todo-list.actions';
import { TodoListState } from './state/todo-list.model';
import { TodoListSandboxService } from './todo-list-sandbox.service';

describe('Service: TodoListSandboxService', () => {
  let service: TodoListSandboxService;
  let store: Store<TodoListState>;
  const todoListResourcesServiceStub = createMagicalMock(TodoListResourcesService);
  todoListResourcesServiceStub.addTodo.and.returnValue(of(new TODOItem('', '')));
  todoListResourcesServiceStub.updateTodo.and.returnValue(of(new TODOItem('', '')));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoListSandboxService,
        { provide: TodoListResourcesService, useValue: todoListResourcesServiceStub },
        provideMockStore({})
      ]
    });

    service = TestBed.get(TodoListSandboxService);
    store = TestBed.get(Store);
    spyOn(store, 'dispatch');
  });

  describe('save$', () => {
    it('should create todo', fakeAsync(() => {
      const todoItem = new TODOItem('', '');

      todoListResourcesServiceStub.addTodo.and.returnValue(of(todoItem));

      service
        .save$(todoItem)
        .pipe(first())
        .subscribe();
      tick(2500);

      expect(store.dispatch).toHaveBeenCalledWith(new SaveTodoItemStartedAction());
      expect(store.dispatch).toHaveBeenCalledWith(new AddTodoItemSuccessAction(todoItem));
    }));

    it('should update todo', fakeAsync(() => {
      const todoItem = new TODOItem('', '');
      todoItem.id = 'someid';

      todoListResourcesServiceStub.updateTodo.and.returnValue(of(todoItem));

      service
        .save$(todoItem)
        .pipe(first())
        .subscribe();
      tick(2500);

      expect(store.dispatch).toHaveBeenCalledWith(new SaveTodoItemStartedAction());
      expect(store.dispatch).toHaveBeenCalledWith(new UpdateTodoItemSuccessAction(todoItem));
    }));
  });
});
