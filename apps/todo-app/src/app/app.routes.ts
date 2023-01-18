import { RouterModule, Routes } from '@angular/router';

import {
	FeatureToggleCanActivateGuard,
	FeatureToggleCanLoadGuard,
	FeatureTogglePreloadingStrategy,
} from '@todo/shared/util-feature-toggle';
import { completedTodoPath, TodoListComponent } from '@todo/todo-app/feature';
import { TodoListResolver } from './todo-list.resolver';

export const rootPath = '';
export const registerPath = 'register';

export const appRoutes: Routes = [
	{
		path: rootPath,
		resolve: [TodoListResolver],
		children: [
			{
				path: rootPath,
				component: TodoListComponent,
				pathMatch: 'full',
			},
			{
				path: completedTodoPath,
				data: {
					flags: ['completed-todos'],
				},
				canActivate: [FeatureToggleCanActivateGuard],
				canLoad: [FeatureToggleCanLoadGuard],
				loadChildren: () =>
					import('@todo/todo-app/feature').then(m => m.TodoListCompletedModule),
			},
		],
	},
	{
		path: registerPath,
		loadChildren: () =>
			import('@todo/todo-app/feature').then(m => m.RegisterModule),
	},
];

export const appRouterModule = RouterModule.forRoot(appRoutes, {
	preloadingStrategy: FeatureTogglePreloadingStrategy,
});
