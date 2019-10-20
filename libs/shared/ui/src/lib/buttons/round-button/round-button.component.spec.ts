/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FabModule } from '@app/shared/buttons/round-button/fab/fab.module';
import { RoundButtonComponent } from '@app/shared/buttons/round-button/round-button.component';

describe('RoundButtonComponent', () => {
	let component: RoundButtonComponent;
	let fixture: ComponentFixture<RoundButtonComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [FabModule],
			declarations: [RoundButtonComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RoundButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
