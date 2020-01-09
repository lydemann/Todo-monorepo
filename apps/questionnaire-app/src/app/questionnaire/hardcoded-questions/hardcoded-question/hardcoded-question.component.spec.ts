/* tslint:disable:no-unused-variable */
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HardcodedQuestionComponent } from './hardcoded-question.component';

describe('HardcodedQuestionComponent', () => {
	let component: HardcodedQuestionComponent;
	let fixture: ComponentFixture<HardcodedQuestionComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [HardcodedQuestionComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(HardcodedQuestionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
