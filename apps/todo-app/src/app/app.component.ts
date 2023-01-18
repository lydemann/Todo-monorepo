import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { EndpointsService } from '@todo/shared/data-access';
import { LogService } from '@todo/shared/data-access-logging';
import { ThemeService } from '@todo/shared/ui-styles';
import { environment, TodoListFacadeService } from '@todo/todo-app/domain';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	constructor(
		translate: TranslateService,
		private todoListSandboxService: TodoListFacadeService,
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
