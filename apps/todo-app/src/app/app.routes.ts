import { RouterModule, Routes } from '@angular/router';

import {
	FeatureToggleCanActivateGuard,
	FeatureToggleCanLoadGuard,
	FeatureTogglePreloadingStrategy,
} from '@todo/shared/util-feature-toggle';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { TodoListComponent, completedTodoPath } from '@todo/todo-app/feature';
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
				loadComponent: () =>
					import('@todo/todo-app/feature').then(
						m => m.TodoListCompletedComponent,
					),
			},
		],
	},
	{
		path: registerPath,
		loadChildren: () =>
			import('@todo/todo-app/feature').then(m => m.RegisterModule),
	},
	{
		path: 'mock-scenarios',
		loadComponent: () =>
			import('@todo/todo-app/feature').then(m => m.MockScenariosComponent),
	},
];

export const appRouterModule = RouterModule.forRoot(appRoutes, {
	preloadingStrategy: FeatureTogglePreloadingStrategy,
});
