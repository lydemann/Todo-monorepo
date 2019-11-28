import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';

import { TODOItem } from '@todo-app/shared/models/todo-item';
import { createMagicalMock } from '@todo/shared/util';
import { TodoListResourcesService } from './resources/todo-list-resources.service';
import { TodoListActions } from './state/todo-list.actions';
import { TodoListState } from './state/todo-list.model';
import { TodoListSandboxService } from './todo-list-sandbox.service';

describe('Service: TodoListSandboxService', () => {
	let service: TodoListSandboxService;
	let store: Store<TodoListState>;
	const todoListResourcesServiceStub = createMagicalMock(
		TodoListResourcesService,
	);
	todoListResourcesServiceStub.addTodoItem.and.returnValue(
		of(new TODOItem('', '')),
	);
	todoListResourcesServiceStub.updateTodoItem.and.returnValue(
		of(new TODOItem('', '')),
	);

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				TodoListSandboxService,
				{
					provide: TodoListResourcesService,
					useValue: todoListResourcesServiceStub,
				},
				provideMockStore({}),
			],
		});

		service = TestBed.get(TodoListSandboxService);
		store = TestBed.get(Store);
		spyOn(store, 'dispatch');
	});

	describe('saveTodoItem', () => {
		it('should save todo item', () => {
			const todoItem = new TODOItem('', '');

			service.saveTodoItem(todoItem);

			expect(store.dispatch).toHaveBeenCalledWith({
				todoItem,
				type: TodoListActions.saveTodoItemRequest.type,
			});
		});
	});
});
