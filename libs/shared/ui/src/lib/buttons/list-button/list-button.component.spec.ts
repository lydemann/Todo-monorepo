import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconComponent } from '../../icon';
import { AppMaterialModule } from '../../material/material.module';
import { AddButtonComponent } from './add-button/add-button.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';
import { ListButtonComponent } from './list-button.component';
import { SmallFabComponent } from './small-fab/small-fab.component';

describe('ListButtonComponent', () => {
	let component: ListButtonComponent;
	let fixture: ComponentFixture<ListButtonComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [AppMaterialModule],
			declarations: [
				ListButtonComponent,
				AddButtonComponent,
				DeleteButtonComponent,
				SmallFabComponent,
				IconComponent,
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ListButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
