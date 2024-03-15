import { waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
	createComponentFactory,
	mockProvider,
	Spectator,
} from '@ngneat/spectator/jest';
import { TranslateModule } from '@ngx-translate/core';

import { signal } from '@angular/core';
import { TodoItem } from '@todo/shared/todo-interfaces';
import { AddTodoComponent, AddTodoReactiveFormsModule } from '@todo/shared/ui';
import { TodoListFacadeService } from '@todo/todo-app/domain';
import { TestingModule } from '@todo/todo-app/testing-util';
import { SharedModule } from '../shared/shared.module';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
	let spectator: Spectator<TodoListComponent>;
	const createComponent = createComponentFactory({
		component: TodoListComponent,
		declarations: [AddTodoComponent],
		imports: [
			FormsModule,
			TodoListComponent,
			TranslateModule.forRoot(),
			SharedModule,
			AddTodoReactiveFormsModule,
			TestingModule,
		],
		providers: [
			mockProvider(TodoListFacadeService, {
				isLoading: signal(false),
				todoList: signal([
					new TodoItem('1', ''),
					new TodoItem('2', ''),
					new TodoItem('3', ''),
				]),
			}),
		],
	});

	beforeEach(() => (spectator = createComponent()));

	describe('get todo list', () => {
		it('should show three todo items', waitForAsync(() => {
			spectator = createComponent();

			spectator.detectChanges();

			expect(spectator.queryAll('[data-test=todo-item]').length).toBe(3);
		}));
	});
});
