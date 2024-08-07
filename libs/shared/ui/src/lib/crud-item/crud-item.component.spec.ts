import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudItemComponent } from './crud-item.component';

/* tslint:disable:no-unused-variable */

describe('CrudItemComponent', () => {
	let component: CrudItemComponent;
	let fixture: ComponentFixture<CrudItemComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [],
			imports: [CrudItemComponent],
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
