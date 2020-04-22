import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { mockProvider, SpyObject } from '@ngneat/spectator';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';

import { completedTodoPath } from '@todo-app/app.routes';
import { TodoItemListRowComponent } from '@todo-app/shared/todo-item-list-row/todo-item-list-row.component';
import { TestingModule } from '@todo-app/testing.module';
import { TodoListCompletedComponent } from '@todo-app/todo-list-completed/todo-list-completed.component';
import { TodoItem } from '@todo/shared/todo-interfaces';
import { TodoListSandboxService } from '@todo/todo-app-lib';

describe('TodoListCompletedComponent', () => {
	let component: TodoListCompletedComponent;
	let fixture: ComponentFixture<TodoListCompletedComponent>;
	const todo1 = {
		...new TodoItem('Buy milk', 'Remember to buy milk'),
		completed: true,
	};
	const todoList = [todo1];
	let todoListSandboxServiceStub: SpyObject<TodoListSandboxService>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TodoListCompletedComponent, TodoItemListRowComponent],
			imports: [TestingModule],
			providers: [
				{ provide: APP_BASE_HREF, useValue: completedTodoPath },
				mockProvider(TodoListSandboxService, { completedTodos$: of(todoList) }),
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TodoListCompletedComponent);
		component = fixture.componentInstance;
		todoListSandboxServiceStub = TestBed.inject(
			TodoListSandboxService,
		) as SpyObject<TodoListSandboxService>;

		fixture.detectChanges();
	});

	it('should have one completed TODO item', done => {
		component.completedTodos$.pipe(first()).subscribe(todos => {
			expect(todos).toBe(todoList);
			done();
		});
	});
});
