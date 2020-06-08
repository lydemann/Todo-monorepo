import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InvalidDateValidatorDirective } from './invalid-date.directive';

const exportedDeclarations = [InvalidDateValidatorDirective];

@NgModule({
	declarations: exportedDeclarations,
	imports: [CommonModule],
	exports: exportedDeclarations,
	providers: [],
})
export class FormValidationModule {}
