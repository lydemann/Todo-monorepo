import { async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
	createComponentFactory,
	mockProvider,
	Spectator,
} from '@ngneat/spectator';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { TODOItem } from '@todo-app/shared/models/todo-item';
import { SharedModule } from '@todo-app/shared/shared.module';
import { TodoListComponent } from '@todo-app/todo-list/todo-list.component';
import { TodoListSandboxService } from '@todo/todo-app-lib';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { DuedateTodayCountPipe } from './duedate-today-count/duedate-today-count.pipe';

describe('TodoListComponent', () => {
	let spectator: Spectator<TodoListComponent>;
	const createComponent = createComponentFactory({
		component: TodoListComponent,
		declarations: [AddTodoComponent, DuedateTodayCountPipe],
		imports: [FormsModule, TranslateModule.forRoot(), SharedModule],
		providers: [
			mockProvider(TodoListSandboxService, {
				todoList$: of([]),
			}),
		],
	});

	beforeEach(() => (spectator = createComponent()));

	describe('get todo list', () => {
		it('should show three todo items', async(() => {
			const todoListSandboxService = spectator.get(TodoListSandboxService);
			todoListSandboxService.todoList$ = of([
				new TODOItem('1', ''),
				new TODOItem('2', ''),
				new TODOItem('3', ''),
			]);
			spectator = createComponent();

			expect(spectator.queryAll('app-todo-item-list-row').length).toBe(3);
		}));
	});
});
