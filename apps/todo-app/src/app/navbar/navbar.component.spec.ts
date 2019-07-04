import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

import { AppComponent } from '@todo-app/app.component';
import { appRouterModule } from '@todo-app/app.routes';
import { CoreModule } from '@todo-app/core/core.module';
import { FooterComponent } from '@todo-app/footer/footer.component';
import { NavbarComponent } from '@todo-app/navbar/navbar.component';
import { TodoItemListRowComponent } from '@todo-app/shared/todo-item-list-row/todo-item-list-row.component';
import { TodoListCompletedComponent } from '@todo-app/todo-list-completed/todo-list-completed.component';
import { AddTodoComponent } from '@todo-app/todo-list/add-todo/add-todo.component';
import { TodoListComponent } from '@todo-app/todo-list/todo-list.component';

describe('NavbarComponent', () => {
	let component: NavbarComponent;
	let fixture: ComponentFixture<NavbarComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				AppComponent,
				NavbarComponent,
				TodoListComponent,
				TodoItemListRowComponent,
				FooterComponent,
				AddTodoComponent,
				TodoListCompletedComponent,
			],
			imports: [
				BrowserModule,
				NgbModule,
				TranslateModule.forRoot(),
				FormsModule,
				CoreModule,
				HttpClientModule,
				appRouterModule,
			],
			providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NavbarComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
