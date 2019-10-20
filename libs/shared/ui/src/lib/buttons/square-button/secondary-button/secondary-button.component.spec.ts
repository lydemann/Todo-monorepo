/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SecondaryButtonComponent } from '@app/shared/buttons/square-button/secondary-button/secondary-button.component';
import { SquareButtonComponent } from '@app/shared/buttons/square-button/square-button.component';

describe('SecondaryButtonComponent', () => {
	let component: SecondaryButtonComponent;
	let fixture: ComponentFixture<SecondaryButtonComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SecondaryButtonComponent],
			providers: [
				{
					provide: SquareButtonComponent,
					useClass: SquareButtonComponent,
				},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SecondaryButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
