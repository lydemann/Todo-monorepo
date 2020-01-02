import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../material/material.module';
import { DatePickerComponent } from './date-picker.component';

@NgModule({
	imports: [CommonModule, AppMaterialModule, ReactiveFormsModule],
	declarations: [DatePickerComponent],
	exports: [DatePickerComponent],
})
export class DatePickerModule {}
