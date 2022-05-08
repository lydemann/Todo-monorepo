/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerComponent } from '@todo/shared/ui';
import { SpinnerOverlayComponent } from '../spinner-overlay/spinner-overlay.component';

describe('SpinnerOverlayComponent', () => {
	let component: SpinnerOverlayComponent;
	let fixture: ComponentFixture<SpinnerOverlayComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [SpinnerOverlayComponent, SpinnerComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SpinnerOverlayComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
