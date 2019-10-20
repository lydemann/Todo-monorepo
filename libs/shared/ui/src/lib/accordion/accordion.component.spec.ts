import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionComponent } from './accordion.component';

describe('AccordionComponent', () => {
	let component: AccordionComponent;
	let fixture: ComponentFixture<AccordionComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AccordionComponent],
		})
			.overrideTemplate(AccordionComponent, `<div>overridden</div>`)
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AccordionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
