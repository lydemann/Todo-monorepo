import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareButtonComponent } from '../square-button.component';
import { PrimaryButtonComponent } from './primary-button.component';

describe('PrimaryButtonComponent', () => {
	let component: PrimaryButtonComponent;
	let fixture: ComponentFixture<PrimaryButtonComponent>;

	beforeEach(waitForAsync(() => {
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
