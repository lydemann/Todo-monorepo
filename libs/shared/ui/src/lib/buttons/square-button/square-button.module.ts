import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ElementsHelpersModule } from '../../elements-helpers/elements-helpers.module';
import { AppMaterialModule } from '../../material/material.module';
import { PrimaryButtonComponent } from './primary-button/primary-button.component';
import { SecondaryButtonComponent } from './secondary-button/secondary-button.component';
import { SquareButtonComponent } from './square-button.component';

@NgModule({
	imports: [CommonModule, AppMaterialModule, ElementsHelpersModule],
	declarations: [
		PrimaryButtonComponent,
		SecondaryButtonComponent,
		SquareButtonComponent,
	],
	exports: [SquareButtonComponent],
})
export class SquareButtonModule {}
