import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { delay } from 'rxjs/operators';

import { TodoItem } from '@todo/shared/todo-interfaces';
import { trpc } from '../../trpc-client';

@Injectable({
	providedIn: 'root',
})
export class TodoListResourcesService {
	public getTodos() {
		return from(trpc.todoList.query());
	}

	public addTodoItem(todo: TodoItem) {
		return from(trpc.createTodoItem.mutate(todo)).pipe(delay(2000));
	}

	public updateTodoItem(todo: TodoItem) {
		return from(trpc.updateTodoItem.mutate(todo)).pipe(delay(2000));
	}
}
