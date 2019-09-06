/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { TODOItem } from '@todo-app/shared/models/todo-item';
import { TodoItemListRowComponentMock } from '@todo-app/shared/todo-item-list-row/todo-item-list-row.component.mock';
import { AddTodoComponentMock } from '@todo-app/todo-list/add-todo/add-todo.component.mock';
import { TodoListComponent } from '@todo-app/todo-list/todo-list.component';
import { createMagicalMock } from '@todo/shared/utils';
import { TodoListSandboxService } from '@todo/todo-app-lib';

describe('TodoListComponent', () => {
	let component: TodoListComponent;
	let fixture: ComponentFixture<TodoListComponent>;

	beforeEach(async(() => {
		const todo1 = new TODOItem('Buy milk', 'Remember to buy milk');
		todo1.completed = true;
		const todoList = [
			todo1,
			new TODOItem('Buy flowers', 'Remember to buy flowers'),
		];

		const todoListSandboxServiceStub = createMagicalMock(
			TodoListSandboxService,
		);

		todoListSandboxServiceStub.todoList$ = of(todoList) as any;

		TestBed.configureTestingModule({
			declarations: [
				TodoListComponent,
				TodoItemListRowComponentMock,
				AddTodoComponentMock,
			],
			imports: [],
			providers: [
				{
					provide: TodoListSandboxService,
					useValue: todoListSandboxServiceStub,
				},
			],
		})
			.overrideTemplate(TodoListComponent, '')
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TodoListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
