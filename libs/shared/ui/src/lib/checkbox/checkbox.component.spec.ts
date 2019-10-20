/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from '@app/shared/checkbox/checkbox.component';
import { AppMaterialModule } from '@app/shared/material/material.module';

describe('CheckboxComponent', () => {
	let component: CheckboxComponent;
	let fixture: ComponentFixture<CheckboxComponent>;

	beforeEach(async(() => {
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
