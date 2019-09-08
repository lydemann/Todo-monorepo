import { NO_ERRORS_SCHEMA } from '@angular/core';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { provideMagicalMock } from '@todo/shared/util';
import { TodoListSandboxService } from '@todo/todo-app-lib';
import { AddTodoComponent } from './add-todo.component';

describe('AddTodoComponent', () => {
	let component: AddTodoComponent;
	let fixture: ComponentFixture<AddTodoComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AddTodoComponent],
			imports: [FormsModule, TranslateModule.forRoot()],
			providers: [provideMagicalMock(TodoListSandboxService)],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	}));

	let todoListSandboxServiceMock: jasmine.SpyObj<TodoListSandboxService>;
	beforeEach(() => {
		todoListSandboxServiceMock = TestBed.get(TodoListSandboxService);

		fixture = TestBed.createComponent(AddTodoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should update todo item when todo item is in todo list', () => {
		// Arrange
		const todoList = [
			{ id: 'task1', title: 'Buy Milk', description: 'Remember to buy milk' },
			{
				id: 'task2',
				title: 'Go to the gym',
				description: 'Remember to work out',
			},
		];
		todoListSandboxServiceMock.saveTodoItem.and.returnValue(of([]));

		// Act
		component.currentTODO = todoList[0];
		const form = new NgForm([], []);
		component.save(form);

		// Assert
		expect(todoListSandboxServiceMock.saveTodoItem).toHaveBeenCalledWith(
			component.currentTODO,
		);
	});

	it('should add new todo item when todo item is not in todo list', () => {
		// Arrange
		const newTodo = {
			id: 'lala1',
			title: 'Buy Milk',
			description: 'Remember to buy milk',
		};

		const todoList = [
			{
				id: 'task1',
				title: 'Buy Milk',
				description: 'Remember to buy milk',
				completed: false,
			},
			{
				id: 'task2',
				title: 'Go to the gym',
				description: 'Remember to work out',
				completed: false,
			},
		];
		(todoListSandboxServiceMock as any).todoList = todoList;
		todoListSandboxServiceMock.saveTodoItem.and.returnValue(of([]));
		component.currentTODO = newTodo;
		const form = new NgForm([], []);

		// Act

		component.save(form);

		// Assert
		expect(todoListSandboxServiceMock.saveTodoItem).toHaveBeenCalledWith(
			newTodo,
		);
	});
});
