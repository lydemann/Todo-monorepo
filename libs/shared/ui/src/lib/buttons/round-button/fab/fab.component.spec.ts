import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabComponent } from './fab.component';

describe('FabComponent', () => {
	let component: FabComponent;
	let fixture: ComponentFixture<FabComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FabComponent],
		})
			.overrideTemplate(FabComponent, `<div>overridden template</div>`)
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FabComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
