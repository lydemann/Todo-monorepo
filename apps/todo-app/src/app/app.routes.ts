import { RouterModule, Routes } from '@angular/router';

import { TodoListComponent } from '@todo-app/todo-list/todo-list.component';
import {
	FeatureToggleCanActivateGuard,
	FeatureToggleCanLoadGuard,
	FeatureTogglePreloadingStrategy,
} from '@todo/shared/util-feature-toggle';

export const rootPath = '';
export const registerPath = 'register';
export const completedTodoPath = 'completed-todos';

const appRoutes: Routes = [
	{
		path: rootPath,
		component: TodoListComponent,
		pathMatch: 'full',
	},
	{
		path: registerPath,
		loadChildren: () =>
			import('./register/register.module').then(m => m.RegisterModule),
	},
	{
		path: completedTodoPath,
		data: {
			flags: ['completed-todos'],
		},
		canActivate: [FeatureToggleCanActivateGuard],
		canLoad: [FeatureToggleCanLoadGuard],
		loadChildren: () =>
			import('./todo-list-completed/todo-list-completed.module').then(
				m => m.TodoListCompletedModule,
			),
	},
];

export const appRouterModule = RouterModule.forRoot(appRoutes, {
	preloadingStrategy: FeatureTogglePreloadingStrategy,
});
