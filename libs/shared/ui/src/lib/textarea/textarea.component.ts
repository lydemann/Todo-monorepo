/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'app-textarea',
	templateUrl: './textarea.component.html',
	styleUrls: ['./textarea.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			// tslint:disable-next-line: no-forward-ref
			useExisting: forwardRef(() => TextareaComponent),
			multi: true,
		},
	],
})
export class TextareaComponent implements ControlValueAccessor {
	@Input() public placeholder = '';
	public touched = false;
	public disabled = false;
	public value = '';

	// tslint:disable-next-line: no-empty
	public propagateChange: any = _ => {};

	// tslint:disable-next-line: no-empty
	public onTouched: any = _ => {};

	public onChange(event) {
		this.propagateChange(event);
	}

	public writeValue(obj: any): void {
		if (obj) {
			this.propagateChange(obj);
			this.value = obj;
		}
	}
	public registerOnChange(fn: any): void {
		this.propagateChange = fn;
	}
	public registerOnTouched(fn: any): void {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const self = this;
		this.onTouched = (arg: any) => {
			self.touched = true;
			fn(arg);
		};
	}
	public setDisabledState?(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}
}
