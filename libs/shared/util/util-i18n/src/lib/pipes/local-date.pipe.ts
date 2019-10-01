import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { LocaleService } from '../services/locale.service';

@Pipe({
	name: 'localDate',
})
export class LocalDatePipe implements PipeTransform {
	constructor(private localeService: LocaleService) {}

	public transform(value: any, format: string) {
		if (!value) {
			return '';
		}
		if (!format) {
			format = 'shortDate';
		}

		return formatDate(value, format, this.localeService.locale);
	}
}
