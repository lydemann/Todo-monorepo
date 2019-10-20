import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareButtonComponent } from '../square-button.component';
import { SecondaryButtonComponent } from './secondary-button.component';

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
