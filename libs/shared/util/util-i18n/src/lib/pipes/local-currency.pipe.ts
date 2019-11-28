import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { LocaleService } from '../services/locale.service';

@Pipe({
	name: 'localCurrency',
})
export class LocalCurrencyPipe implements PipeTransform {
	constructor(private localeService: LocaleService) {}

	public transform(value: any, currencyCode?: string, digitsInfo?: string) {
		if (!value) {
			return '';
		}

		if (!currencyCode) {
			currencyCode = 'USD';
		}

		const currencySymbol = getCurrencySymbol(currencyCode, 'wide');

		return formatCurrency(
			+value,
			this.localeService.locale,
			currencySymbol,
			currencyCode,
			digitsInfo,
		);
	}
}
