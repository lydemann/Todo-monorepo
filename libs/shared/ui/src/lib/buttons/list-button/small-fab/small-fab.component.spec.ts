/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ListButtonComponent } from '@app/shared/buttons/list-button/list-button.component';

import { SmallFabComponent } from './small-fab.component';

describe('SmallFabComponent', () => {
	let component: SmallFabComponent;
	let fixture: ComponentFixture<SmallFabComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SmallFabComponent],
			providers: [
				{
					provide: ListButtonComponent,
					useClass: ListButtonComponent,
				},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SmallFabComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
