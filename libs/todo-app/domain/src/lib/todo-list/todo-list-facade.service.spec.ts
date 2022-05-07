import { TestBed } from '@angular/core/testing';
import { createSpyObject } from '@ngneat/spectator/jest';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { TodoItem } from '@todo/shared/todo-interfaces';
import { TodoListResourcesService } from './resources/todo-list-resources.service';
import { TodoListActions } from './state/todo-list.actions';
import { TodoListState } from './state/todo-list.model';
import { TodoListFacadeService } from './todo-list-facade.service';

describe('Service: TodoListFacadeService', () => {
	let service: TodoListFacadeService;
	let store: Store<TodoListState>;
	const todoListResourcesServiceStub = createSpyObject(
		TodoListResourcesService,
	);
	todoListResourcesServiceStub.addTodoItem.andReturn(of(new TodoItem('', '')));
	todoListResourcesServiceStub.updateTodoItem.andReturn(
		of(new TodoItem('', '')),
	);

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				TodoListFacadeService,
				{
					provide: TodoListResourcesService,
					useValue: todoListResourcesServiceStub,
				},
				provideMockStore({}),
			],
		});

		service = TestBed.inject(TodoListFacadeService);
		store = TestBed.inject(Store);
		jest.spyOn(store, 'dispatch');
	});

	describe('saveTodoItem', () => {
		it('should save todo item', () => {
			const todoItem = {
				title: 'Some title',
				description: 'Some description',
				dueDate: '2020-10-10',
			} as TodoItem;

			service.saveTodoItem(todoItem);

			expect(store.dispatch).toHaveBeenCalledWith({
				todoItem,
				type: TodoListActions.saveTodoItemRequest.type,
			});
		});
	});
});
