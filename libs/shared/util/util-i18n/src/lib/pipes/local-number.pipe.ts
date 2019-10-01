import { formatNumber } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { LocaleService } from '../services/locale.service';

@Pipe({
	name: 'localNumber',
})
export class LocalNumberPipe implements PipeTransform {
	constructor(private localeService: LocaleService) {}

	public transform(value: any, format: string) {
		if (value == null) {
			return '';
		} // !value would also react to zeros.
		if (!format) {
			format = '1.2-2';
		}

		return formatNumber(value, this.localeService.locale, format);
	}
}
