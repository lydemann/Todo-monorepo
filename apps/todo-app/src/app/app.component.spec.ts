import { APP_BASE_HREF } from '@angular/common';
import { async, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { AppComponent } from '@todo-app/app.component';
import { API_ENDPOINTS } from '@todo/shared/data-access';
import { provideMagicalMock } from '@todo/shared/util';
import { TodoListSandboxService } from '@todo/todo-app-lib';
import { FooterComponentMock } from './footer/footer.component.mock';
import { NavbarComponentMock } from './layout/navbar/navbar.component.mock';

const apiTendpoints = {
	todoService: 'todoService',
	loggingService: 'loggingService',
};

describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AppComponent, NavbarComponentMock, FooterComponentMock],
			imports: [],
			providers: [
				{ provide: APP_BASE_HREF, useValue: '/' },
				provideMagicalMock(TranslateService),
				{ provide: API_ENDPOINTS, useValue: apiTendpoints },
				provideMagicalMock(TodoListSandboxService),
			],
		})
			.overrideTemplate(AppComponent, '')
			.compileComponents();
	}));

	let translateServiceMock: jasmine.SpyObj<TranslateService>;
	it('should create the app', async(() => {
		translateServiceMock = TestBed.get(TranslateService);
		translateServiceMock.getBrowserLang.and.returnValue('en');
		const fixture = TestBed.createComponent(AppComponent);

		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	}));
});
