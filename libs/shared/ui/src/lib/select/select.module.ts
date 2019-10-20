import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../material/material.module';
import { SelectOptionGroupComponent } from './select-option-group/select-option-group.component';
import { SelectOptionComponent } from './select-option/select-option.component';
import { SelectComponent } from './select.component';
@NgModule({
	exports: [SelectComponent, SelectOptionComponent, SelectOptionGroupComponent],
	imports: [CommonModule, AppMaterialModule, FormsModule, ReactiveFormsModule],
	declarations: [
		SelectComponent,
		SelectOptionComponent,
		SelectOptionGroupComponent,
	],
})
export class SelectModule {}
