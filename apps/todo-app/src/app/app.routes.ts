import { RouterModule, Routes } from '@angular/router';

import { TodoListCompletedComponent } from '@todo-app/todo-list-completed/todo-list-completed.component';
import { TodoListComponent } from '@todo-app/todo-list/todo-list.component';

export const rootPath = '';
export const completedTodoPath = 'completed-todos';

const appRoutes: Routes = [
	{
		path: rootPath,
		component: TodoListComponent,
		pathMatch: 'full',
	},
	{
		path: completedTodoPath,
		component: TodoListCompletedComponent,
	},
];

export const appRouterModule = RouterModule.forRoot(appRoutes);
