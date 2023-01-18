import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TodoListFacadeService } from '@todo/todo-app/domain';

@Injectable({ providedIn: 'root' })
export class TodoListResolver implements Resolve<void> {
	constructor(private todoListSandboxService: TodoListFacadeService) {}

	resolve(route: ActivatedRouteSnapshot): void {
		this.todoListSandboxService.loadTodoList();
		return;
	}
}
