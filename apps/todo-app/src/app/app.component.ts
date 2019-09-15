import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ThemeService } from '@todo/shared/ui-styles';
import { TodoListSandboxService } from '@todo/todo-app-lib';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	constructor(
		translate: TranslateService,
		private todoListSandboxService: TodoListSandboxService,
		private themeService: ThemeService,
		private renderer: Renderer2,
		private elementRef: ElementRef,
	) {
		translate.addLangs(['en', 'da']);
		translate.setDefaultLang('en');

		const browserLang = translate.getBrowserLang();
		translate.use(browserLang.match(/en|da/) ? browserLang : 'en');
	}
	public ngOnInit(): void {
		this.todoListSandboxService.loadTodoList();

		this.themeService.activeTheme$.subscribe(theme => {
			this.renderer.removeAttribute(this.elementRef.nativeElement, 'class');
			this.renderer.addClass(this.elementRef.nativeElement, theme);
		});
	}
}
