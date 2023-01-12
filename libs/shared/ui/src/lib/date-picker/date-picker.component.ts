import {
	AfterViewInit,
	ApplicationRef,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	HostListener,
	Input,
	OnDestroy,
} from '@angular/core';
import {
	ControlValueAccessor,
	FormControl,
	FormGroupDirective,
	NgControl,
	NgForm,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
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
		const isInvalidAndTouched = !!(
			control &&
			control.invalid &&
			(!form || isSubmitted || control.touched)
		);

		return this.hasError !== undefined ? this.hasError : isInvalidAndTouched;
	}
}

@Component({
	selector: 'app-date-picker',
	templateUrl: './date-picker.component.html',
	styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent
	implements ControlValueAccessor, OnDestroy, AfterViewInit
{
	@Input()
	public date: Date;

	@Input() public minDate: Date;
	@Input() public maxDate: Date;

	@Input() public errorMessage = 'Invalid input';
	@Input() public placeholder = 'Choose a date';
	public dateChange: EventEmitter<Date> = new EventEmitter();
	public isDisabled = false;
	// used to display mat error
	public formControl = new FormControl('');
	private destroy$ = new Subject<void>();
	private _showErrorSubject = new BehaviorSubject<boolean>(undefined);
	private _showError$: Observable<boolean> =
		this._showErrorSubject.asObservable();
	// tslint:disable-next-line: member-ordering
	public dateErrorStateMatcher = new DateErrorStateMatcher(
		this._showError$,
		this.destroy$.asObservable(),
	);

	private onTouched = Function;

	constructor(
		public ngControl: NgControl,
		private changeDetectionRef: ChangeDetectorRef,
		private applicationRef: ApplicationRef,
	) {
		ngControl.valueAccessor = this;
	}
	@Input()
	public set showError(v: boolean) {
		this._showErrorSubject.next(v);
	}
	public ngAfterViewInit(): void {
		// syncing with validators on host element
		this.formControl = this.ngControl.control as FormControl;
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
	}

	public onDateChange(dateInput: MatDatepickerInputEvent<Date>) {
		const date = dateInput.value;
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

	@HostListener('keyup', ['$event'])
	@HostListener('click', ['$event'])
	@HostListener('change', ['$event'])
	public runCD() {
		this.applicationRef.tick();
		this.changeDetectionRef.detectChanges();
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	private onChange = (date: Date) => {};
}
