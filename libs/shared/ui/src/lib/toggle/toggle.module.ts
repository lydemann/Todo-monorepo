import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../material/material.module';
import { ToggleComponent } from './toggle.component';

@NgModule({
	exports: [ToggleComponent],
	imports: [CommonModule, AppMaterialModule],
	declarations: [ToggleComponent],
})
export class ToggleModule {}
