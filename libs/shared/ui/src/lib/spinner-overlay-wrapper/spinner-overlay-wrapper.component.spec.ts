import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerModule } from '../spinner/spinner.module';
import { SpinnerOverlayWrapperComponent } from './spinner-overlay-wrapper.component';

describe('SpinnerOverlayWrapperComponent', () => {
	let component: SpinnerOverlayWrapperComponent;
	let fixture: ComponentFixture<SpinnerOverlayWrapperComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [SpinnerOverlayWrapperComponent],
			imports: [SpinnerModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SpinnerOverlayWrapperComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
