import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMaterialModule } from '../material/material.module';
import { TooltipComponent } from './tooltip.component';

describe('TooltipComponent', () => {
	let component: TooltipComponent;
	let fixture: ComponentFixture<TooltipComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [TooltipComponent],
			imports: [AppMaterialModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TooltipComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
