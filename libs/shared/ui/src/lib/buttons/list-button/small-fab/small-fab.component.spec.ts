import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListButtonComponent } from '../list-button.component';
import { SmallFabComponent } from './small-fab.component';

describe('SmallFabComponent', () => {
	let component: SmallFabComponent;
	let fixture: ComponentFixture<SmallFabComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [SmallFabComponent],
			providers: [
				{
					provide: ListButtonComponent,
					useClass: ListButtonComponent,
				},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SmallFabComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
