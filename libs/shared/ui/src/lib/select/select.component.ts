import {
	AfterContentInit,
	Component,
	ContentChildren,
	EventEmitter,
	forwardRef,
	Input,
	OnChanges,
	Output,
	QueryList,
	SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { SelectOptionGroupComponent } from './select-option-group/select-option-group.component';
import { SelectOptionGroup } from './select-option-group/select-option-group.interface';
import { SelectOptionComponent } from './select-option/select-option.component';
import { SelectOption } from './select-option/select-option.interface';

@Component({
	selector: 'app-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			// tslint:disable-next-line: no-forward-ref
			useExisting: forwardRef(() => SelectComponent),
			multi: true,
		},
	],
})
export class SelectComponent
	implements OnChanges, AfterContentInit, ControlValueAccessor
{
	@Input() public placeholder: string;
	@ContentChildren(SelectOptionComponent)
	public selectOptions: QueryList<SelectOptionComponent>;
	@ContentChildren(SelectOptionGroupComponent)
	public selectOptionGroups: QueryList<SelectOptionGroupComponent>;
	@Output() public valueChange = new EventEmitter();
	public options: SelectOption[];
	public optionsGroups: SelectOptionGroup[];
	public selected;
	public disabled = false;
	public touched = false;
	private internalValue: SelectOption;

	public onChange: any = _ => {
		/*Empty*/
	};

	// eslint-disable-next-line @typescript-eslint/no-empty-function
	public onTouched: any = _ => {};

	public onSelected($event) {
		this.selected = $event.value;
		this.onChange($event.value);
		this.valueChange.emit($event.value);
	}

	public ngOnChanges(change: SimpleChanges) {
		if (change['options']) {
			if (change['options'].isFirstChange()) {
				return;
			}
			if (change['options'].currentValue !== change['options'].previousValue) {
				this.selected = null; // Resetting the model to show placeholder
				this.onChange(null);
			}
		}
	}

	public ngAfterContentInit() {
		this.options = this.getOptions(this.selectOptions);
		this.optionsGroups = this.getOptionGroups(this.selectOptionGroups);

		this.selectOptionGroups.changes.subscribe(
			(optionGroups: QueryList<SelectOptionGroupComponent>) =>
				(this.optionsGroups = this.getOptionGroups(optionGroups)),
		);

		this.selectOptions.changes.subscribe(
			(options: QueryList<SelectOption>) =>
				(this.options = options.length ? this.getOptions(options) : []),
		);
	}

	// CONTROL VALUE ACCESSOR

	public writeValue(value: any): void {
		this.internalValue = value;
		this.onChange(this.internalValue);
		this.valueChange.emit(value);
		this.selected = value;
	}

	public registerOnChange(fn: any): void {
		this.onChange = fn;
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

	private getOptionGroups(list: QueryList<SelectOptionGroupComponent>) {
		return list.length
			? list.map(group => ({
					label: group.label,
					options: this.getOptions(group.selectOptions),
			  }))
			: [];
	}

	private getOptions(list: QueryList<SelectOptionComponent>): SelectOption[] {
		return list.length
			? list.map((item: SelectOptionComponent) => ({
					value: item.value,
					templateRef: item.templateRef,
			  }))
			: [];
	}
}
