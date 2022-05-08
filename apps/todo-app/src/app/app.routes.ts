import { RouterModule, Routes } from '@angular/router';

import {
	FeatureToggleCanActivateGuard,
	FeatureToggleCanLoadGuard,
	FeatureTogglePreloadingStrategy,
} from '@todo/shared/util-feature-toggle';
import { completedTodoPath, TodoListComponent } from '@todo/todo-app/feature';

export const rootPath = '';
export const registerPath = 'register';

const appRoutes: Routes = [
	{
		path: rootPath,
		component: TodoListComponent,
		pathMatch: 'full',
	},
	{
		path: registerPath,
		loadChildren: () =>
			import('@todo/todo-app/feature').then(m => m.RegisterModule),
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
];

export const appRouterModule = RouterModule.forRoot(appRoutes, {
	preloadingStrategy: FeatureTogglePreloadingStrategy,
});
