import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

import { TodoItem } from '@todo/shared/todo-interfaces';
import { trpc } from '../../trpc-client';

@Injectable({
	providedIn: 'root',
})
export class TodoListResourcesService {
	public getTodos() {
		return from(trpc.todoList.query()) as Observable<TodoItem[]>;
	}

	public addTodoItem(todo: TodoItem) {
		return from(
			trpc.createTodoItem.mutate({
				description: todo.description,
				title: todo.title,
				dueDate: todo.dueDate ?? '',
			}),
		) as Observable<TodoItem>;
	}

	public updateTodoItem(todo: TodoItem) {
		return from(trpc.updateTodoItem.mutate(todo)) as Observable<TodoItem>;
	}

	public deleteTodoItem(id: string) {
		return from(trpc.deleteTodoItem.mutate(id)) as Observable<TodoItem>;
	}
}
