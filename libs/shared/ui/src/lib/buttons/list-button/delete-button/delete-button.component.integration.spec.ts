/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IconComponent } from '@app/shared/buttons/icon/icon.component';
import { DeleteButtonComponent } from '@app/shared/buttons/list-button/delete-button/delete-button.component';
import { ListButtonComponent } from '@app/shared/buttons/list-button/list-button.component';
import { SmallFabComponent } from '@app/shared/buttons/list-button/small-fab/small-fab.component';
import { RoundButtonComponent } from '@app/shared/buttons/round-button/round-button.component';

describe('DeleteButtonComponent', () => {
	let component: DeleteButtonComponent;
	let fixture: ComponentFixture<DeleteButtonComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
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
