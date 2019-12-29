import { APP_BASE_HREF } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { completedTodoPath } from '@todo-app/app.routes';
import { TodoItem } from '@todo-app/shared/models/todo-item';
import { TodoListCompletedComponent } from '@todo-app/todo-list-completed/todo-list-completed.component';
import { createMagicalMock } from '@todo/shared/util-test';
import { TodoListSandboxService } from '@todo/todo-app-lib';

describe('TodoListCompletedComponent', () => {
	let component: TodoListCompletedComponent;
	let fixture: ComponentFixture<TodoListCompletedComponent>;
	const todoListSandboxServiceStub = createMagicalMock(TodoListSandboxService);
	const todo1 = {
		...new TodoItem('Buy milk', 'Remember to buy milk'),
		completed: true,
	};
	const todoList = [todo1];

	beforeEach(async(() => {
		todoListSandboxServiceStub.completedTodos$ = of(todoList) as any;
		TestBed.configureTestingModule({
			declarations: [TodoListCompletedComponent],
			imports: [],
			providers: [
				{ provide: APP_BASE_HREF, useValue: completedTodoPath },
				{
					provide: TodoListSandboxService,
					useValue: todoListSandboxServiceStub,
				},
			],
		})
			.overrideTemplate(TodoListCompletedComponent, '')
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TodoListCompletedComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have one completed TODO item', () => {
		component.completedTodos$.subscribe(todos => {
			expect(todos).toBe(todoList);
		});
	});
});
