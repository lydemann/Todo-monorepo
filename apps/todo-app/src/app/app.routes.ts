import { RouterModule, Routes } from '@angular/router';

import { TodoListComponent } from '@todo-app/todo-list/todo-list.component';
import {
	FeatureToggleCanActivateGuard,
	FeatureToggleCanLoadGuard,
	FeatureTogglePreloadingStrategy,
} from '@todo/shared/util-feature-toggle';

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
		data: {
			flags: ['completed-todos'],
		},
		canActivate: [FeatureToggleCanActivateGuard],
		canLoad: [FeatureToggleCanLoadGuard],
		loadChildren:
			'./todo-list-completed/todo-list-completed.module#TodoListCompletedModule',
	},
];

export const appRouterModule = RouterModule.forRoot(appRoutes, {
	preloadingStrategy: FeatureTogglePreloadingStrategy,
});
