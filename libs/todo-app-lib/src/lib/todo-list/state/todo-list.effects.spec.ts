import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { TODOItem } from '@todo-app/shared/models/todo-item';
import { createMagicalMock } from '@todo/shared/utils';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { TodoListResourcesService } from '../resources/todo-list-resources.service';
import {
  LoadTodoList,
  LoadTodoListFailedAction,
  LoadTodoListSuccessAction
} from './todo-list.actions';
import { TodoListEffects } from './todo-list.effects';

describe('TodoListEffects', () => {
  let actions: Observable<any>;

  let effects: TodoListEffects;
  const todoListResourcesStub = createMagicalMock(TodoListResourcesService);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoListEffects,
        provideMockActions(() => actions),
        {
          provide: TodoListResourcesService,
          useValue: todoListResourcesStub
        }
      ]
    });

    effects = TestBed.get(TodoListEffects);
  });

  describe('loadTodoList', () => {
    it('should return a stream with todo list loaded action', () => {
      const todoList: TODOItem[] = [{ title: '', id: '1', description: '' }];
      const action = new LoadTodoList();
      const outcome = new LoadTodoListSuccessAction(todoList);

      actions = hot('-a', { a: action });
      const response = cold('-a|', { a: todoList });
      todoListResourcesStub.getTodos$.and.returnValue(response);

      const expected = cold('--b', { b: outcome });
      expect(effects.loadTodoList$).toBeObservable(expected);
    });

    it('should fail and return an action with the error', () => {
      const action = new LoadTodoList();
      const error = new Error('some error') as any;
      const outcome = new LoadTodoListFailedAction(error);

      actions = hot('-a', { a: action });
      const response = cold('-#|', {}, error);
      todoListResourcesStub.getTodos$.and.returnValue(response);

      const expected = cold('--(b|)', { b: outcome });
      expect(effects.loadTodoList$).toBeObservable(expected);
    });
  });
});
