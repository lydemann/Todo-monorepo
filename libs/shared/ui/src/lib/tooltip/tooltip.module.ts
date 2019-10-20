import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../material/material.module';
import { TooltipComponent } from './tooltip.component';

@NgModule({
	exports: [TooltipComponent],
	imports: [CommonModule, AppMaterialModule],
	declarations: [TooltipComponent],
})
export class TooltipModule {}
