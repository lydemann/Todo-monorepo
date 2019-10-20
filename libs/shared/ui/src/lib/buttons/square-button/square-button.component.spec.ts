/* tslint:disable:no-unused-variable */
import { CommonModule } from '@angular/common';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrimaryButtonComponent } from '@app/shared/buttons/square-button/primary-button/primary-button.component';
import { SecondaryButtonComponent } from '@app/shared/buttons/square-button/secondary-button/secondary-button.component';
import { AppMaterialModule } from '@app/shared/material/material.module';

import { SquareButtonComponent } from './square-button.component';

describe('SquareButtonComponent', () => {
	let component: SquareButtonComponent;
	let fixture: ComponentFixture<SquareButtonComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [CommonModule, AppMaterialModule],
			declarations: [
				PrimaryButtonComponent,
				SecondaryButtonComponent,
				SquareButtonComponent,
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SquareButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
