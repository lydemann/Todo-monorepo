/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IconComponent } from '@app/shared/buttons/icon/icon.component';
import { AddButtonComponent } from '@app/shared/buttons/list-button/add-button/add-button.component';
import { DeleteButtonComponent } from '@app/shared/buttons/list-button/delete-button/delete-button.component';
import { SmallFabComponent } from '@app/shared/buttons/list-button/small-fab/small-fab.component';

import { ListButtonComponent } from './list-button.component';

describe('ListButtonComponent', () => {
	let component: ListButtonComponent;
	let fixture: ComponentFixture<ListButtonComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				ListButtonComponent,
				AddButtonComponent,
				DeleteButtonComponent,
				SmallFabComponent,
				IconComponent,
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ListButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
