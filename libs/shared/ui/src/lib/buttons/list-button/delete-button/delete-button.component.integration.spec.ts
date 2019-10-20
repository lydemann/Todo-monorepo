import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconComponent } from '../../../icon';
import { AppMaterialModule } from '../../../material/material.module';
import { ListButtonComponent } from '../list-button.component';
import { SmallFabComponent } from '../small-fab/small-fab.component';
import { DeleteButtonComponent } from './delete-button.component';

describe('DeleteButtonComponent', () => {
	let component: DeleteButtonComponent;
	let fixture: ComponentFixture<DeleteButtonComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [AppMaterialModule],
			declarations: [DeleteButtonComponent, SmallFabComponent, IconComponent],
			providers: [
				{
					provide: ListButtonComponent,
					useClass: ListButtonComponent,
				},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(DeleteButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
