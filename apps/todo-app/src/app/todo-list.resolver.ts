import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { TodoListFacadeService } from '@todo/todo-app/domain';

@Injectable({ providedIn: 'root' })
export class TodoListResolver implements Resolve<void> {
	constructor(private todoListSandboxService: TodoListFacadeService) {}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	resolve(route: ActivatedRouteSnapshot): void {
		this.todoListSandboxService.loadTodoList();
		return;
	}
}
