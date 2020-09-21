import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonsModule } from '../../buttons';
import { DatePickerModule } from '../../date-picker';
import { ElementsHelpersModule } from '../../elements-helpers/elements-helpers.module';
import { SpinnerModule } from '../../spinner';
import { AddTodoReactiveFormsComponent } from './add-todo-reactive-forms.component';

@NgModule({
	imports: [
		ReactiveFormsModule,
		CommonModule,
		DatePickerModule,
		MatInputModule,
		TranslateModule,
		ButtonsModule,
		SpinnerModule,
		ElementsHelpersModule,
	],
	declarations: [AddTodoReactiveFormsComponent],
	exports: [AddTodoReactiveFormsComponent],
})
export class AddTodoReactiveFormsModule {}
