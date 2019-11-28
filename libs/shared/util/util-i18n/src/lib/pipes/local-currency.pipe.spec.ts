import { formatCurrency, getCurrencySymbol } from '@angular/common';

import { LocaleService } from '../services/locale.service';
import { LocalCurrencyPipe } from './local-currency.pipe';

describe('Pipe: LocalCurrencye', () => {
	let localeServiceMock: LocaleService;

	beforeEach(() => {
		localeServiceMock = {
			locale: 'en-US',
		} as LocaleService;
	});

	it('should format currency', () => {
		const pipe = new LocalCurrencyPipe(localeServiceMock as any);

		const currencyCode = 'USD';
		const value = '500';
		const res = pipe.transform(value, currencyCode);
		const currencySymbol = getCurrencySymbol(currencyCode, 'wide');

		const expectedRes = formatCurrency(
			+value,
			localeServiceMock.locale,
			currencySymbol,
			currencyCode,
		);
		expect(res).toBe(expectedRes);
	});
});
