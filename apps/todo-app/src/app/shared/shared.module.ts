import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { InvalidDateValidatorDirective } from '@todo-app/shared/invalid-date.directive';
import { SpinnerOverlayWrapperModule } from '@todo-app/shared/spinner-overlay-wrapper/spinner-overlay-wrapper.module';
import { SpinnerModule } from '@todo/shared/ui';
import { AppMaterialModule } from './app-material/app-material.module';
import { CardListModule } from './cards-list/cards-list.module';
import { TodoItemCardComponent } from './todo-item-card/todo-item-card.component';
import { TodoItemListRowComponent } from './todo-item-list-row/todo-item-list-row.component';

@NgModule({
	imports: [
		CommonModule,
		SpinnerModule,
		SpinnerOverlayWrapperModule,
		TranslateModule,
		CardListModule,
		AppMaterialModule,
	],
	declarations: [
		InvalidDateValidatorDirective,
		TodoItemListRowComponent,
		TodoItemCardComponent,
	],
	exports: [
		InvalidDateValidatorDirective,
		SpinnerModule,
		SpinnerOverlayWrapperModule,
		TranslateModule,
		CardListModule,
		TodoItemListRowComponent,
		TodoItemCardComponent,
		AppMaterialModule,
	],
})
export class SharedModule {}
