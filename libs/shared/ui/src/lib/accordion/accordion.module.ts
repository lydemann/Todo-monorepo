import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

import { IconModule } from '../icon/icon.module';
import { AccordionComponent } from './accordion.component';

@NgModule({
	imports: [CommonModule, IconModule, MatExpansionModule],
	declarations: [AccordionComponent],
	exports: [AccordionComponent],
})
export class AccordionModule {}
