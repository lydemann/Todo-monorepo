import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CDInputDirective } from './cd-input.directive';
const exportDeclarations = [CDInputDirective];

@NgModule({
	declarations: exportDeclarations,
	imports: [CommonModule],
	exports: exportDeclarations,
	providers: [],
})
export class ElementsHelpersModule {}
