import { getLocaleNumberSymbol, NumberSymbol } from '@angular/common';
import {
	Directive,
	ElementRef,
	Inject,
	Input,
	LOCALE_ID,
	OnDestroy,
	OnInit,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

/**
 * Directive for formatting input values as you type.
 * Supports these features:
 * #1: Converts thousand to decimal separator on type (thousandToDecimalSeparatorEnabled: true)
 * #2: Adds thousand separators to input value (thousandSeparatorEnabled: true)
 * #3: Removed decimals (decimalsEnabled: false)
 * This will also make sure to keep same input cursor position on update.
 *
 * Example:
 * ```
 *  <input appNumberInput [thousandToDecimalSeparatorEnabled]="true" [thousandSeparatorEnabled]="true" [decimalsEnabled]="false" [formControl]="someFormControl" />
 * ```
 */

@Directive({
	selector: '[appNumberInput]',
})
export class NumberInputDirective implements OnInit, OnDestroy {
	@Input() public thousandToDecimalSeparatorEnabled = true;
	@Input() public thousandSeparatorEnabled = true;
	@Input() public decimalsEnabled = true;
	public groupingSeparator: string;
	public decimalSeparator: string;

	private destroy$ = new Subject<void>();
	private lastValue = '';

	constructor(
		private ngControl: NgControl,
		@Inject(LOCALE_ID) private locale: string,
		private hostElement: ElementRef<HTMLInputElement>,
	) {
		if (!hostElement.nativeElement.setSelectionRange) {
			throw new Error("'appNumberInput' can only be applied to input element");
		}
	}

	public ngOnInit() {
		this.groupingSeparator = getLocaleNumberSymbol(
			this.locale,
			NumberSymbol.CurrencyGroup,
		);
		this.decimalSeparator = getLocaleNumberSymbol(
			this.locale,
			NumberSymbol.CurrencyDecimal,
		);

		this.lastValue = this.hostElement.nativeElement.value;
		return this.ngControl.valueChanges
			.pipe(
				takeUntil(this.destroy$),
				map(value => value || ''),
				map(value => this.convertThousandToDecimalSeparator(value)),
				map(value => {
					return this.formatThousandSeparator(value);
				}),
				map(value => {
					return this.formatNoDecimals(value);
				}),
			)
			.subscribe(val => {
				this.lastValue = val;
			});
	}

	public ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	public formatNoDecimals(value: string): any {
		if (this.decimalsEnabled) {
			return value;
		}

		const decimalIdx = value.indexOf(this.decimalSeparator);
		const noDecimalVal =
			decimalIdx !== -1 ? value.substring(0, decimalIdx) : value;

		const inputElm = this.hostElement.nativeElement as HTMLInputElement;
		this.updateVal(noDecimalVal, inputElm, inputElm.selectionStart);
		return noDecimalVal;
	}

	private formatThousandSeparator(value: string) {
		if (!this.thousandSeparatorEnabled) {
			return value;
		}
		const inputElement = this.hostElement.nativeElement;
		const cursorPosition = inputElement.selectionStart;
		const lengthBeforeFormatting = value.length;
		const formattedVal = this.getNumberWithThousandSeparator(
			value,
			this.groupingSeparator,
			this.decimalSeparator,
		);
		const newCursorPosition = this.getCursorPositionAfterFormatting(
			formattedVal,
			lengthBeforeFormatting,
			cursorPosition,
		);
		this.updateVal(formattedVal, inputElement, newCursorPosition);
		return formattedVal;
	}

	private getCursorPositionAfterFormatting(
		formattedVal: string,
		lengthBeforeFormatting: number,
		cursorPosition: number,
	) {
		const lengthAfterFormatting = formattedVal.length;
		if (lengthBeforeFormatting === lengthAfterFormatting + 1) {
			cursorPosition = cursorPosition - 1;
		}
		if (lengthBeforeFormatting === lengthAfterFormatting - 1) {
			cursorPosition = cursorPosition + 1;
		}
		return cursorPosition;
	}

	private convertThousandToDecimalSeparator(value: string): string {
		if (!this.thousandToDecimalSeparatorEnabled) {
			return value;
		}

		let val = value;
		const hasAddedThousandSeparator = this.hasAddedThousandSeparator(
			val,
			this.lastValue,
		);

		if (hasAddedThousandSeparator) {
			const inputElement = this.hostElement.nativeElement;
			const cursorPosition = inputElement.selectionStart;
			val = this.replaceAt(val, cursorPosition - 1, this.decimalSeparator);

			this.updateVal(val, inputElement, cursorPosition);
		}

		return val;
	}

	private replaceAt(val: string, index: number, replacement: string) {
		return (
			val.substr(0, index) +
			replacement +
			val.substr(index + replacement.length)
		);
	}

	private hasAddedThousandSeparator(diffSource: string, diffBy: string) {
		const isOneCharAdded = diffSource.length === diffBy.length + 1;

		if (!isOneCharAdded) {
			return false;
		}

		const isThousandSeparatorAdded =
			diffSource.split(this.groupingSeparator).length >
			diffBy.split(this.groupingSeparator).length;
		return isThousandSeparatorAdded;
	}

	private getNumberWithThousandSeparator(
		num: string,
		groupingSeparator: string,
		decimalSeparator: string,
	) {
		const decimalIdx = num.indexOf(decimalSeparator);
		const beforeWithThousandSeparators =
			this.getFormattedBeforeDecimalPartOfNumber(
				decimalIdx,
				num,
				groupingSeparator,
			);

		const decimalStr = this.getDecimalPartOfNumber(decimalIdx, num);

		const formattedVal = beforeWithThousandSeparators + decimalStr;
		return formattedVal;
	}

	private getFormattedBeforeDecimalPartOfNumber(
		decimalIdx: number,
		num: string,
		groupingSeparator: string,
	) {
		const beforeDecimalStr =
			decimalIdx > 0 ? num.substring(0, decimalIdx + 1) : num;
		const beforeWithoutThousandSeparators =
			this.getValWithoutThousandSeparators(beforeDecimalStr);
		const onlyContains0Regex = /^[0.,]*$/;
		const trimmedBeforeDecimals =
			beforeWithoutThousandSeparators.length > 1
				? beforeWithoutThousandSeparators.replace(
						/^0+/,
						onlyContains0Regex.test(beforeWithoutThousandSeparators) ? '0' : '',
				  )
				: beforeWithoutThousandSeparators;
		const beforeWithThousandSeparators = trimmedBeforeDecimals.replace(
			/(\d)(?=(\d{3})+(?!\d))/g,
			`$1${groupingSeparator}`,
		);
		return beforeWithThousandSeparators;
	}

	private getValWithoutThousandSeparators(beforeDecimalStr: string) {
		const groupingSeparatorRegex = new RegExp(
			`\\${this.groupingSeparator}`,
			'g',
		);
		return beforeDecimalStr.replace(groupingSeparatorRegex, '');
	}

	private getDecimalPartOfNumber(decimalIdx: number, num: string) {
		const decimalPart = decimalIdx > 0 ? num.substring(decimalIdx + 1) : null;
		const decimalStr = decimalPart ? decimalPart : '';
		return decimalStr;
	}

	private updateVal(
		formattedVal: string,
		inputElement: HTMLInputElement,
		cursorPosition: number,
	) {
		if (!formattedVal) {
			return;
		}

		this.ngControl.control.setValue(formattedVal, {
			emitEvent: false,
			onlySelf: true,
		});

		const valWithoutThousandSeparator =
			this.getValWithoutThousandSeparators(formattedVal);

		// This is for setting the formControl value without thousand separators but not reflecting it in the view
		this.ngControl.control.setValue(valWithoutThousandSeparator, {
			emitEvent: false,
			emitModelToViewChange: false,
		});
		inputElement.setSelectionRange(cursorPosition, cursorPosition);
	}
}
