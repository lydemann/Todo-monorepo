import { TestBed } from '@angular/core/testing';
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

  describe('saveTodoItem', () => {
    it('should create todo', (done) => {
      const todoItem = new TODOItem('', '');

      todoListResourcesServiceStub.addTodo.and.returnValue(of(todoItem));

      service
        .saveTodoItem(todoItem)
        .pipe(first())
        .subscribe(() => {
          expect(store.dispatch).toHaveBeenCalledWith(new SaveTodoItemStartedAction());
          expect(store.dispatch).toHaveBeenCalledWith(new AddTodoItemSuccessAction(todoItem));
          done();
        });
    });

    it('should update todo', (done) => {
      const todoItem = new TODOItem('', '');
      todoItem.id = 'someid';

      todoListResourcesServiceStub.updateTodo.and.returnValue(of(todoItem));

      service
        .saveTodoItem(todoItem)
        .pipe(first())
        .subscribe(() => {
          expect(store.dispatch).toHaveBeenCalledWith(new SaveTodoItemStartedAction());
          expect(store.dispatch).toHaveBeenCalledWith(new UpdateTodoItemSuccessAction(todoItem));
          done();
        });
    });
  });
});
