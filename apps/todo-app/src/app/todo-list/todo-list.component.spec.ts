import { async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
	createComponentFactory,
	mockProvider,
	Spectator,
} from '@ngneat/spectator';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { SharedModule } from '@todo-app/shared/shared.module';
import { TestingModule } from '@todo-app/testing.module';
import { TodoListComponent } from '@todo-app/todo-list/todo-list.component';
import { TodoItem } from '@todo/shared/todo-interfaces';
import { AddTodoComponent, AddTodoReactiveFormsModule } from '@todo/shared/ui';
import { TodoListSandboxService } from '@todo/todo-app-lib';
import { DuedateTodayCountPipe } from './duedate-today-count/duedate-today-count.pipe';

describe('TodoListComponent', () => {
	let spectator: Spectator<TodoListComponent>;
	const createComponent = createComponentFactory({
		component: TodoListComponent,
		declarations: [AddTodoComponent, DuedateTodayCountPipe],
		imports: [
			FormsModule,
			TranslateModule.forRoot(),
			SharedModule,
			AddTodoReactiveFormsModule,
			TestingModule,
		],
		providers: [
			mockProvider(TodoListSandboxService, {
				todoList$: of([]),
			}),
		],
	});

	beforeEach(() => (spectator = createComponent()));

	describe('get todo list', () => {
		it('should show three todo items', async(() => {
			const todoListSandboxService = spectator.inject(TodoListSandboxService);
			todoListSandboxService.todoList$ = of([
				new TodoItem('1', ''),
				new TodoItem('2', ''),
				new TodoItem('3', ''),
			]);
			spectator = createComponent();

			expect(spectator.queryAll('app-todo-item-list-row').length).toBe(3);
		}));
	});
});
