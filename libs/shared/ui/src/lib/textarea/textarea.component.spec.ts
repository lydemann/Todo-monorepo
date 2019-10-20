import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaComponent } from './textarea.component';

describe('TextareaComponent', () => {
	let component: TextareaComponent;
	let fixture: ComponentFixture<TextareaComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TextareaComponent],
		})
			.overrideTemplate(TextareaComponent, `<div>overridden template</div>`)
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TextareaComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
