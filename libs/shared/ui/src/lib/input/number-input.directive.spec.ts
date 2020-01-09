import { LOCALE_ID } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';

import { NumberInputDirective } from './number-input.directive';

describe('Directive: NumberInputDirective', () => {
	[
		// { id: 'da', separators: { group: '.', decimal: ',' } },
		{ id: 'en', separators: { group: ',', decimal: '.' } },
	].forEach(locale => {
		describe(`locale: ${locale.id}`, () => {
			const createHost = createDirectiveFactory({
				directive: NumberInputDirective,
				declarations: [NumberInputDirective],
				imports: [FormsModule, ReactiveFormsModule],
				providers: [
					{
						provide: LOCALE_ID,
						useValue: locale.id,
					},
				],
			});
			let testFormControl: FormControl;

			let spectator: SpectatorDirective<NumberInputDirective>;

			beforeEach(() => {
				testFormControl = new FormControl('');
				const template = `<input appNumberInput [formControl]="testFormControl" />`;
				spectator = createHost(template, {
					hostProps: { testFormControl },
				});
			});

			describe('thousand separator', () => {
				it('should NOT add thousand separators for 10 digit number if disabled', () => {
					spectator.directive.thousandSeparatorEnabled = false;
					spectator.detectChanges();
					const val = '1234567899';
					testFormControl.setValue(val);
					spectator.detectChanges();

					expect((spectator.element as HTMLInputElement).value).toBe(val);
				});

				it('should add thousand separators for 10 digit number and set original value in formControl', () => {
					spectator.detectChanges();
					const orgVal = '1234567899';
					testFormControl.setValue(orgVal);
					spectator.detectChanges();

					expect((spectator.element as HTMLInputElement).value).toBe(
						`1${locale.separators.group}234${locale.separators.group}567${locale.separators.group}899`,
					);

					expect(testFormControl.value).toBe(orgVal);
				});

				it('should only allow one "0" in input', () => {
					spectator.detectChanges();
					testFormControl.setValue('00');
					spectator.detectChanges();

					expect((spectator.element as HTMLInputElement).value).toBe(`0`);
				});

				it('should remove leading "0"s in input', () => {
					testFormControl.setValue('001234567899');
					spectator.detectChanges();

					expect((spectator.element as HTMLInputElement).value).toBe(
						`1${locale.separators.group}234${locale.separators.group}567${locale.separators.group}899`,
					);
				});

				it('should NOT add thousand separators for 20 digit number after decimal separator with 10 decimals', () => {
					spectator.detectChanges();
					testFormControl.setValue(
						`1234567899${locale.separators.decimal}1234567899`,
					);
					spectator.detectChanges();

					expect((spectator.element as HTMLInputElement).value).toBe(
						`1${locale.separators.group}234${locale.separators.group}567${locale.separators.group}899${locale.separators.decimal}1234567899`,
					);
				});

				it('should NOT add thousand separators for 3 digit number', () => {
					spectator.detectChanges();
					testFormControl.setValue(`123`);
					spectator.detectChanges();

					expect((spectator.element as HTMLInputElement).value).toBe(`123`);
				});

				it('should update add thousand separators when going from 3 to 4 digit number', () => {
					spectator.detectChanges();
					testFormControl.setValue(`123`);
					spectator.detectChanges();
					testFormControl.setValue(`1234`);
					spectator.detectChanges();

					expect((spectator.element as HTMLInputElement).value).toBe(
						`1${locale.separators.group}234`,
					);
				});

				it('should remove thousand separators when going from 4 to 3 digit number', () => {
					spectator.detectChanges();
					const orgVal = `1${locale.separators.group}234`;
					testFormControl.setValue(orgVal);
					spectator.detectChanges();
					const lastCharRemoved = orgVal.slice(0, -1);
					testFormControl.setValue(lastCharRemoved);
					spectator.detectChanges();

					expect((spectator.element as HTMLInputElement).value).toBe(`123`);
				});
			});

			describe('thousand to decimal separator', () => {
				beforeEach(() => {
					spectator.directive.thousandSeparatorEnabled = false;
					spectator.directive.decimalsEnabled = true;
					spectator.detectChanges();
				});

				it('should NOT convert thousand-separator to decimal-separator when changed char is a thousand-separator and "thousandToDecimalSeparatorEnabled" is disabled', () => {
					spectator.directive.thousandToDecimalSeparatorEnabled = false;
					const val = `12${locale.separators.group}34`;
					testFormControl.setValue(val);
					spectator.detectChanges();

					expect((spectator.element as HTMLInputElement).value).toBe(val);
				});

				it('should convert thousand-separator to decimal-separator only when changed char is a thousand-separator', () => {
					const inputElm = spectator.element as HTMLInputElement;
					inputElm.value = '1234';
					spectator.detectChanges();
					spectator.directive.ngOnInit();
					inputElm.setSelectionRange(3, 3);
					testFormControl.setValue(`12${locale.separators.group}34`, {
						emitModelToViewChange: false,
						emitViewToModelChange: false,
						onlySelf: true,
					});
					spectator.detectChanges();

					expect((spectator.element as HTMLInputElement).value).toBe(
						`12${locale.separators.decimal}34`,
					);
				});

				it('should convert thousand-separator to decimal-separator when added thousand-separator at beginning of input', () => {
					const inputElm = spectator.element as HTMLInputElement;
					inputElm.value = '1234';
					spectator.detectChanges();
					spectator.directive.ngOnInit();
					inputElm.setSelectionRange(1, 1);
					testFormControl.setValue(`${locale.separators.group}1234`, {
						emitModelToViewChange: false,
						emitViewToModelChange: false,
						onlySelf: true,
					});
					spectator.detectChanges();

					expect((spectator.element as HTMLInputElement).value).toBe(
						`${locale.separators.decimal}1234`,
					);
				});

				it('should not convert thousand-separator to decimal-separator if changed char is not a thousand-separator', () => {
					spectator.detectChanges();
					testFormControl.setValue('1234');
					testFormControl.setValue('12€34');
					spectator.detectChanges();

					expect((spectator.element as HTMLInputElement).value).toBe('12€34');
				});

				it('should not convert thousand-separator to decimal-separator if more than 1 changed char', () => {
					spectator.detectChanges();
					testFormControl.setValue('1234');
					const lastVal = `1233234${locale.separators.group}34`;
					testFormControl.setValue(lastVal);
					spectator.detectChanges();

					expect((spectator.element as HTMLInputElement).value).toBe(lastVal);
				});
			});

			describe('decimalsEnabled', () => {
				beforeEach(() => {
					spectator.directive.thousandSeparatorEnabled = false;
					spectator.directive.thousandToDecimalSeparatorEnabled = false;
				});

				it('should remove decimals from number if decimals not enabled', () => {
					spectator.directive.decimalsEnabled = false;
					spectator.detectChanges();
					testFormControl.setValue(`1234${locale.separators.decimal}12345679`);
					spectator.detectChanges();

					expect((spectator.element as HTMLInputElement).value).toBe('1234');
				});

				it('should NOT remove decimals from number if decimals enabled', () => {
					spectator.directive.decimalsEnabled = true;
					spectator.detectChanges();
					const val = `1234${locale.separators.decimal}12345679`;
					testFormControl.setValue(val);
					spectator.detectChanges();

					expect((spectator.element as HTMLInputElement).value).toBe(val);
				});
			});

			describe('empty string', () => {
				it('should not format input, nor set selection range', () => {
					spectator.detectChanges();

					const htmlElement = spectator.element as HTMLInputElement;
					spyOn(htmlElement, 'setSelectionRange');
					expect(htmlElement.value).toBe('');
					expect(htmlElement.setSelectionRange).not.toHaveBeenCalled();
				});
			});
		});
	});
});
