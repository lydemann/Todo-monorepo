import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMaterialModule } from '../material/material.module';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
	let component: CheckboxComponent;
	let fixture: ComponentFixture<CheckboxComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [CheckboxComponent],
			imports: [AppMaterialModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CheckboxComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
