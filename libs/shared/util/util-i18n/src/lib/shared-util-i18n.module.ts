import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LocalCurrencyPipe } from './pipes/local-currency.pipe';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { LocalNumberPipe } from './pipes/local-number.pipe';

const DECLARATIONS = [LocalCurrencyPipe, LocalDatePipe, LocalNumberPipe];

@NgModule({
	imports: [CommonModule],
	declarations: [...DECLARATIONS],
	exports: [...DECLARATIONS],
})
export class SharedUtilUtilI18nModule {}
