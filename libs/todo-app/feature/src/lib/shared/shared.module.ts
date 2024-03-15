import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { SharedUiModule } from '@todo/shared/ui';
import { FeatureToggleModule } from '@todo/shared/util-feature-toggle';
import { SharedUtilUtilI18nModule } from '@todo/shared/util-i18n';
import { AppMaterialModule } from './app-material/app-material.module';
import { CardsListComponent } from './cards-list/cards-list.component';
import { TodoItemCardComponent } from './todo-item-card/todo-item-card.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		TranslateModule,
		CardsListComponent,
		AppMaterialModule,
		FeatureToggleModule,
		SharedUtilUtilI18nModule,
		SharedUiModule,
	],
	declarations: [TodoItemCardComponent],
	exports: [
		CommonModule,
		FormsModule,
		RouterModule,
		TranslateModule,
		CardsListComponent,
		TodoItemCardComponent,
		AppMaterialModule,
		FeatureToggleModule,
		SharedUiModule,
	],
})
export class SharedModule {}
