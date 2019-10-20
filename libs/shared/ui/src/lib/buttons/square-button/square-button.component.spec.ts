import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMaterialModule } from '../../material/material.module';
import { PrimaryButtonComponent } from './primary-button/primary-button.component';
import { SecondaryButtonComponent } from './secondary-button/secondary-button.component';
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
