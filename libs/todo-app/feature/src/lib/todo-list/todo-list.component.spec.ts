import { waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
	createComponentFactory,
	mockProvider,
	Spectator,
} from '@ngneat/spectator/jest';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { TodoListComponent } from './todo-list.component';
import { TodoItem } from '@todo/shared/todo-interfaces';
import { AddTodoComponent, AddTodoReactiveFormsModule } from '@todo/shared/ui';
import { TodoListFacadeService } from '@todo/todo-app/domain';
import { DuedateTodayCountPipe } from './duedate-today-count/duedate-today-count.pipe';
import { SharedModule } from '../shared/shared.module';
import { TestingModule } from '@todo/todo-app/testing-util';

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
			mockProvider(TodoListFacadeService, {
				todoList$: of([]),
				isLoading$: of(false),
			}),
		],
	});

	beforeEach(() => (spectator = createComponent()));

	describe('get todo list', () => {
		it('should show three todo items', waitForAsync(() => {
			const todoListSandboxService = spectator.inject(TodoListFacadeService);
			todoListSandboxService.todoList$ = of([
				new TodoItem('1', ''),
				new TodoItem('2', ''),
				new TodoItem('3', ''),
			]);
			spectator = createComponent();

			spectator.detectChanges();

			// expect(spectator.element).toMatchInlineSnapshot();

			expect(spectator.queryAll('[data-test=todo-item]').length).toBe(3);
		}));
	});
});
