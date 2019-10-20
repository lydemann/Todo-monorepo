/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PrimaryButtonComponent } from '@app/shared/buttons/square-button/primary-button/primary-button.component';
import { SquareButtonComponent } from '@app/shared/buttons/square-button/square-button.component';

describe('PrimaryButtonComponent', () => {
	let component: PrimaryButtonComponent;
	let fixture: ComponentFixture<PrimaryButtonComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PrimaryButtonComponent],
			providers: [
				{
					provide: SquareButtonComponent,
					useClass: SquareButtonComponent,
				},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PrimaryButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
