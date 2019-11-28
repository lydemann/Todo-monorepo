import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { TODOItem } from '@todo-app/shared/models/todo-item';
import { EndpointsService } from '@todo/shared/data-access';
import { Guid } from '@todo/shared/util';

@Injectable({
	providedIn: 'root',
})
export class TodoListResourcesService {
	private todoListUrl = this.endpointsService.todoService + '/api/todo-list';

	constructor(
		private httpClient: HttpClient,
		private endpointsService: EndpointsService,
	) {}

	public getTodos() {
		return this.httpClient.get<TODOItem[]>(this.todoListUrl);
	}

	public addTodoItem(todo: TODOItem) {
		const todoWithId = {
			...todo,
			id: Guid.newGuid(),
		};
		return of(todoWithId).pipe(delay(2000));
	}

	public updateTodoItem(todo: TODOItem) {
		return of(todo).pipe(delay(2000));
	}
}
