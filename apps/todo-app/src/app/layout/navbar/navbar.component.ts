import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { colorTheme, ThemeService } from '@todo/shared/ui-styles';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
	public themes = this.themeService.themes;
	public activeTheme$ = this.themeService.activeTheme$;

	constructor(
		public translate: TranslateService,
		private themeService: ThemeService,
	) {}

	public setTheme(theme: colorTheme) {
		this.themeService.setTheme(theme);
	}
}
