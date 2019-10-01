import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LocalCurrencyPipe } from './pipes/local-currency.pipe';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { LocalNumberPipe } from './pipes/local-number.pipe';

@NgModule({
	imports: [CommonModule],
	declarations: [LocalCurrencyPipe, LocalDatePipe, LocalNumberPipe],
})
export class SharedUtilUtilI18nModule {}
