import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { InvalidDateValidatorDirective } from '@todo-app/shared/invalid-date.directive';
import { SharedUiModule } from '@todo/shared/ui';
import { FeatureToggleModule } from '@todo/shared/util-feature-toggle';
import { SharedUtilUtilI18nModule } from '@todo/shared/util-i18n';
import { AppMaterialModule } from './app-material/app-material.module';
import { CardListModule } from './cards-list/cards-list.module';
import { TodoItemCardComponent } from './todo-item-card/todo-item-card.component';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		TranslateModule,
		CardListModule,
		AppMaterialModule,
		FeatureToggleModule,
		SharedUtilUtilI18nModule,
		SharedUiModule,
	],
	declarations: [InvalidDateValidatorDirective, TodoItemCardComponent],
	exports: [
		InvalidDateValidatorDirective,
		RouterModule,
		TranslateModule,
		CardListModule,
		TodoItemCardComponent,
		AppMaterialModule,
		FeatureToggleModule,
		SharedUiModule,
	],
})
export class SharedModule {}
