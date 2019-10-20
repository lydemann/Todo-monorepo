import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMaterialModule } from '../material/material.module';
import { IconComponent } from './icon.component';

describe('IconComponent', () => {
	let component: IconComponent;
	let fixture: ComponentFixture<IconComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [AppMaterialModule],
			declarations: [IconComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(IconComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
