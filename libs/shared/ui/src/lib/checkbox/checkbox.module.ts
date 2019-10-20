import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../material/material.module';
import { CheckboxComponent } from './checkbox.component';

@NgModule({
	exports: [CheckboxComponent],
	imports: [CommonModule, AppMaterialModule],
	declarations: [CheckboxComponent],
})
export class CheckboxModule {}
