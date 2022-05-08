import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { mockProvider, SpyObject } from '@ngneat/spectator/jest';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';

import { TodoItem } from '@todo/shared/todo-interfaces';
import { CrudItemComponent } from '@todo/shared/ui';
import { TodoListFacadeService } from '@todo/todo-app/domain';
import { TestingModule } from '@todo/todo-app/testing-util';
import { TodoListCompletedComponent } from './todo-list-completed.component';
import { completedTodoPath } from './todo-list-completed.constants';

describe('TodoListCompletedComponent', () => {
	let component: TodoListCompletedComponent;
	let fixture: ComponentFixture<TodoListCompletedComponent>;
	const todo1 = {
		...new TodoItem('Buy milk', 'Remember to buy milk'),
		completed: true,
	};
	const todoList = [todo1];
	let todoListSandboxServiceStub: SpyObject<TodoListFacadeService>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TodoListCompletedComponent, CrudItemComponent],
			imports: [TestingModule],
			providers: [
				{ provide: APP_BASE_HREF, useValue: completedTodoPath },
				mockProvider(TodoListFacadeService, { completedTodos$: of(todoList) }),
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TodoListCompletedComponent);
		component = fixture.componentInstance;
		todoListSandboxServiceStub = TestBed.inject(
			TodoListFacadeService,
		) as SpyObject<TodoListFacadeService>;

		fixture.detectChanges();
	});

	it('should have one completed TODO item', done => {
		component.completedTodos$.pipe(first()).subscribe(todos => {
			expect(todos).toBe(todoList);
			done();
		});
	});
});
