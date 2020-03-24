import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { IconModule } from '../../../icon/icon.module';
import { FabComponent } from './fab.component';

@NgModule({
	imports: [CommonModule, MatButtonModule, IconModule],
	exports: [FabComponent],
	declarations: [FabComponent],
})
export class FabModule {}
