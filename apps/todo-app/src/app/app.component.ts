import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { EndpointsService } from '@todo/shared/data-access';
import { LogService } from '@todo/shared/data-access-logging';
import { ThemeService } from '@todo/shared/ui-styles';
import { environment } from '@todo/todo-app/domain';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { LayoutModule } from '@todo/todo-app/feature';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	standalone: true,
	imports: [LayoutModule, RouterModule],
})
export class AppComponent implements OnInit {
	constructor(
		translate: TranslateService,
		private themeService: ThemeService,
		private renderer: Renderer2,
		private elementRef: ElementRef,
		private logService: LogService,
		private endpointsService: EndpointsService,
	) {
		translate.addLangs(['en', 'da']);
		translate.setDefaultLang('en');

		const browserLang = translate.getBrowserLang();
		translate.use(browserLang.match(/en|da/) ? browserLang : 'en');
	}
	public ngOnInit(): void {
		this.logService.initialize({
			appName: 'todo-app',
			logUrl: this.endpointsService.loggingService,
			env: environment.environment,
		});

		this.themeService.activeTheme$.subscribe(theme => {
			this.renderer.removeAttribute(this.elementRef.nativeElement, 'class');
			this.renderer.addClass(this.elementRef.nativeElement, theme);
		});
	}
}
