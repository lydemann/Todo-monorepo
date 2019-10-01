import { registerLocaleData } from '@angular/common';
import localeNorwegian from '@angular/common/locales/nb';
import localeSwedish from '@angular/common/locales/sv';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LocaleService {
	private _locale: string;

	public set locale(value: string) {
		this._locale = value;
	}
	public get locale(): string {
		return this._locale || 'en-US';
	}

	public registerCulture(culture: string) {
		if (!culture) {
			return;
		}
		this.locale = culture;

		// Register locale data since only the en-US locale data comes with Angular
		switch (culture) {
			case 'nb-NO': {
				registerLocaleData(localeNorwegian);
				break;
			}
			case 'sv-SE': {
				registerLocaleData(localeSwedish);
				break;
			}
		}
	}
}
