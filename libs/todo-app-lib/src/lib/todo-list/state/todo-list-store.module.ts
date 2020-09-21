import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { FEATURE_STORE_ANONYMIZER } from '@todo/shared/data-access-logging';
import { TodoListAnonymizer } from './todo-list.anonymizer';
import { TodoListEffects } from './todo-list.effects';
import { todoListReducer } from './todo-list.reducer';

@NgModule({
	declarations: [],
	imports: [
		StoreModule.forFeature('todoList', todoListReducer),
		EffectsModule.forFeature([TodoListEffects]),
	],
	exports: [],
	providers: [
		{
			provide: FEATURE_STORE_ANONYMIZER,
			useClass: TodoListAnonymizer,
			multi: true,
		},
	],
})
export class TodoListStoreModuleModule {}
