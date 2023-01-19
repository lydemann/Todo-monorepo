import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

import { LocaleService } from '../services/locale.service';

@Pipe({
	name: 'localDate',
})
export class LocalDatePipe implements PipeTransform {
	constructor(private localeService: LocaleService) {}

	public transform(
		value: string | number | Date,
		format: string = 'shortDate',
	) {
		if (!value) {
			return '';
		}

		return formatDate(value, format, this.localeService.locale);
	}
}
