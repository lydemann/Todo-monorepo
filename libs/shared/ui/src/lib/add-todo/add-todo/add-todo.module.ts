import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';

import { ButtonsModule } from '../../buttons';
import { DatePickerModule } from '../../date-picker';
import { FormValidationModule } from '../../form-validation/form-validation.module';
import { SpinnerModule } from '../../spinner';
import { AddTodoComponent } from './add-todo.component';

@NgModule({
	imports: [
		FormsModule,
		CommonModule,
		DatePickerModule,
		MatInputModule,
		TranslateModule,
		ButtonsModule,
		SpinnerModule,
		FormValidationModule,
	],
	declarations: [AddTodoComponent],
	exports: [AddTodoComponent],
})
export class AddTodoModule {}
