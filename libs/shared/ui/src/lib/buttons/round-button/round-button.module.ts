import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../../material/material.module';
import { FabModule } from './fab/fab.module';
import { RoundButtonComponent } from './round-button.component';

@NgModule({
	imports: [CommonModule, AppMaterialModule, FabModule],
	declarations: [RoundButtonComponent],
	exports: [FabModule, RoundButtonComponent],
})
export class RoundButtonModule {}
