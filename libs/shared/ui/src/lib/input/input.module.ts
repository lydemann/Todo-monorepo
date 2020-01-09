import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NumberInputDirective } from './number-input.directive';

@NgModule({
	imports: [CommonModule],
	declarations: [NumberInputDirective],
	exports: [NumberInputDirective],
	providers: [],
})
export class InputModule {}
