import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMaterialModule } from '../material/material.module';
import { ToggleComponent } from './toggle.component';

describe('ToggleComponent', () => {
	let component: ToggleComponent;
	let fixture: ComponentFixture<ToggleComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [ToggleComponent],
			imports: [AppMaterialModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ToggleComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
