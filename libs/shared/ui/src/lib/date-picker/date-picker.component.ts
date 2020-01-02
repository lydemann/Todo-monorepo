import { Component, EventEmitter, Input, OnDestroy } from '@angular/core';
import {
	ControlValueAccessor,
	FormControl,
	FormGroupDirective,
	NgControl,
	NgForm,
} from '@angular/forms';
import { ErrorStateMatcher, MatDatepickerInputEvent } from '@angular/material';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

class DateErrorStateMatcher implements ErrorStateMatcher {
	private hasError: boolean = undefined;

	constructor(hasError$: Observable<boolean>, destroy$: Observable<void>) {
		hasError$.pipe(takeUntil(destroy$)).subscribe(hasError => {
			this.hasError = hasError;
		});
	}

	public isErrorState(
		control: FormControl,
		form: NgForm | FormGroupDirective,
	): boolean {
		const isSubmitted = form && form.submitted;
		const isFromDirtyAndSubmitted = !!(
			control &&
			control.invalid &&
			isSubmitted &&
			(control.dirty || control.touched)
		);
		return this.hasError !== undefined
			? this.hasError
			: isFromDirtyAndSubmitted;
	}
}

@Component({
	selector: 'app-date-picker',
	templateUrl: './date-picker.component.html',
	styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements ControlValueAccessor, OnDestroy {
	@Input()
	public set showError(v: boolean) {
		this._showErrorSubject.next(v);
	}
	@Input()
	public date: Date;

	@Input() public minDate: Date;
	@Input() public maxDate: Date;

	@Input() public errorMessage: string = 'Invalid input';
	@Input() public placeholder: string = 'Choose a date';
	public dateChange: EventEmitter<Date> = new EventEmitter();
	public isDisabled = false;
	// tslint:disable-next-line: member-ordering
	public hasError: boolean = this.ngControl.invalid;

	// used to display mat error
	public formControl = new FormControl('');

	private _showErrorSubject = new BehaviorSubject<boolean>(undefined);
	private destroy$ = new Subject<void>();
	private _showError$: Observable<
		boolean
	> = this._showErrorSubject.asObservable();
	// tslint:disable-next-line: member-ordering
	public dateErrorStateMatcher = new DateErrorStateMatcher(
		this._showError$,
		this.destroy$.asObservable(),
	);
	private onTouched = Function;

	constructor(public ngControl: NgControl, private ngForm: NgForm) {
		ngControl.valueAccessor = this;
	}
	public ngOnDestroy(): void {
		this.destroy$.next();
	}

	public onDateChange(dateInput: MatDatepickerInputEvent<Date>) {
		const date = dateInput.target.value;
		this.onChange(date);
		this.onTouched();
		this.dateChange.next(date);
	}

	public writeValue(obj: Date): void {
		this.date = obj;
	}
	public registerOnChange(fn: any): void {
		this.onChange = fn;
	}
	public registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}
	public setDisabledState?(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}

	// tslint:disable-next-line: no-empty
	private onChange = (date: Date) => {};
}
