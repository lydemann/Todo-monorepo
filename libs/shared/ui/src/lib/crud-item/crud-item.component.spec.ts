import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudItemComponent } from './crud-item.component';

/* tslint:disable:no-unused-variable */

describe('CrudItemComponent', () => {
	let component: CrudItemComponent;
	let fixture: ComponentFixture<CrudItemComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CrudItemComponent],
			imports: [],
		})
			.overrideTemplate(CrudItemComponent, '')
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CrudItemComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
