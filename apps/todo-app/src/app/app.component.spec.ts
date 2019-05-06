import { APP_BASE_HREF } from '@angular/common';
import { async, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from '@todo-app/app.component';
import { provideMagicalMock } from '@todo/shared/utils';
import { TodoListSandboxService } from '@todo/todo-app-lib';
import { FooterComponentMock } from './footer/footer.component.mock';
import { NavbarComponentMock } from './navbar/navbar.component.mock';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent, NavbarComponentMock, FooterComponentMock],
      imports: [],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        provideMagicalMock(TranslateService),
        provideMagicalMock(TodoListSandboxService)
      ]
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
