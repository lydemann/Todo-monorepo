/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMaterialModule } from '@app/shared/material/material.module';
import { ToggleComponent } from '@app/shared/toggle/toggle.component';
import { TooltipComponent } from '@app/shared/tooltip/tooltip.component';

describe('ToggleComponent', () => {
	let component: ToggleComponent;
	let fixture: ComponentFixture<ToggleComponent>;

	beforeEach(async(() => {
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
