/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from '@app/shared/buttons/icon/icon.component';
import { AddButtonComponent } from '@app/shared/buttons/list-button/add-button/add-button.component';
import { ListButtonComponent } from '@app/shared/buttons/list-button/list-button.component';
import { SmallFabComponent } from '@app/shared/buttons/list-button/small-fab/small-fab.component';
import { RoundButtonComponent } from '@app/shared/buttons/round-button/round-button.component';

describe('AddButtonComponent', () => {
	let component: AddButtonComponent;
	let fixture: ComponentFixture<AddButtonComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AddButtonComponent, SmallFabComponent, IconComponent],
			providers: [
				{
					provide: ListButtonComponent,
					useClass: ListButtonComponent,
				},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AddButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
