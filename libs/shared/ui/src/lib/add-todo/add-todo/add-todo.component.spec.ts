import { NO_ERRORS_SCHEMA } from '@angular/core';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { mockProvider } from '@ngneat/spectator/jest';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { TodoListFacadeService } from '@todo/todo-app/domain';
import { DatePickerModule } from '../../date-picker/date-picker.module';
import { AddTodoComponent } from './add-todo.component';

describe('AddTodoComponent', () => {
	let component: AddTodoComponent;
	let fixture: ComponentFixture<AddTodoComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [AddTodoComponent],
			imports: [
				FormsModule,
				TranslateModule.forRoot(),
				DatePickerModule,
				NoopAnimationsModule,
			],
			providers: [mockProvider(TodoListFacadeService)],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AddTodoComponent);
		component = fixture.componentInstance;
		jest.spyOn(component.saveTodoItem, 'next');
		fixture.detectChanges();
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

		// Act
		component.currentTodo = todoList[0];
		const form = new NgForm([], []);
		component.save(form);

		// Assert
		expect(component.saveTodoItem.next).toHaveBeenCalledWith(
			component.currentTodo,
		);
	});

	it('should add new todo item when todo item is not in todo list', () => {
		// Arrange
		const newTodo = {
			id: 'lala1',
			title: 'Buy Milk',
			description: 'Remember to buy milk',
		};

		component.currentTodo = newTodo;
		const form = new NgForm([], []);

		// Act

		component.save(form);

		// Assert
		expect(component.saveTodoItem.next).toHaveBeenCalledWith(newTodo);
	});
});
