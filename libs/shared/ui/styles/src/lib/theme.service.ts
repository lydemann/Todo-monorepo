import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type colorTheme = 'light-theme' | 'dark-theme';

@Injectable({
	providedIn: 'root',
})
export class ThemeService {
	public themes = ['light-theme', 'dark-theme'];

	private activeThemeSubject = new BehaviorSubject<colorTheme>('light-theme');
	// tslint:disable-next-line: member-ordering
	public activeTheme$ = this.activeThemeSubject.asObservable();

	public setTheme(themeName: colorTheme) {
		this.activeThemeSubject.next(themeName);
	}
}
