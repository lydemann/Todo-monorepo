import { LOCALE_ID } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { render, screen, fireEvent } from '@testing-library/angular';
import { NumberInputDirective } from './number-input.directive';

describe('Directive: NumberInputDirective', () => {
	[{ id: 'en', separators: { group: ',', decimal: '.' } }].forEach(locale => {
		describe(`locale: ${locale.id}`, () => {
			let testFormControl: FormControl;

			const setup = async (
				{
					thousandSeparatorEnabled,
					thousandToDecimalSeparatorEnabled,
					decimalsEnabled,
				}: {
					thousandSeparatorEnabled?: boolean;
					thousandToDecimalSeparatorEnabled?: boolean;
					decimalsEnabled?: boolean;
				} = {
					thousandSeparatorEnabled: true,
					thousandToDecimalSeparatorEnabled: true,
					decimalsEnabled: true,
				},
			) => {
				testFormControl = new FormControl('');
				await render(
					`<input appNumberInput [formControl]="testFormControl"
					 [thousandSeparatorEnabled]="thousandSeparatorEnabled"
					 [thousandToDecimalSeparatorEnabled]="thousandToDecimalSeparatorEnabled"
					 [decimalsEnabled]="decimalsEnabled" />`,
					{
						declarations: [NumberInputDirective],
						imports: [FormsModule, ReactiveFormsModule],
						providers: [
							{
								provide: LOCALE_ID,
								useValue: locale.id,
							},
						],
						componentProperties: {
							testFormControl,
							thousandSeparatorEnabled,
							thousandToDecimalSeparatorEnabled,
							decimalsEnabled,
						},
					},
				);
			};

			describe('thousand separator', () => {
				it('should NOT add thousand separators for 10 digit number if disabled', async () => {
					await setup({ thousandSeparatorEnabled: false });
					const input = screen.getByRole('textbox') as HTMLInputElement;
					fireEvent.input(input, { target: { value: '1234567899' } });

					expect(input.value).toBe('1234567899');
				});

				it('should add thousand separators for 10 digit number and set original value in formControl', async () => {
					await setup();
					const input = screen.getByRole('textbox') as HTMLInputElement;
					fireEvent.input(input, { target: { value: '1234567899' } });

					expect(input.value).toBe(
						`1${locale.separators.group}234${locale.separators.group}567${locale.separators.group}899`,
					);

					expect(testFormControl.value).toBe('1234567899');
				});

				it('should only allow one "0" in input', async () => {
					await setup();
					const input = screen.getByRole('textbox') as HTMLInputElement;
					fireEvent.input(input, { target: { value: '00' } });

					expect(input.value).toBe('0');
				});

				it('should remove leading "0"s in input', async () => {
					await setup();
					const input = screen.getByRole('textbox') as HTMLInputElement;
					fireEvent.input(input, { target: { value: '001234567899' } });

					expect(input.value).toBe(
						`1${locale.separators.group}234${locale.separators.group}567${locale.separators.group}899`,
					);
				});

				it('should NOT add thousand separators for 20 digit number after decimal separator with 10 decimals', async () => {
					await setup();
					const input = screen.getByRole('textbox') as HTMLInputElement;
					fireEvent.input(input, {
						target: {
							value: `1234567899${locale.separators.decimal}1234567899`,
						},
					});

					expect(input.value).toBe(
						`1${locale.separators.group}234${locale.separators.group}567${locale.separators.group}899${locale.separators.decimal}1234567899`,
					);
				});

				it('should NOT add thousand separators for 3 digit number', async () => {
					await setup();
					const input = screen.getByRole('textbox') as HTMLInputElement;
					fireEvent.input(input, { target: { value: '123' } });

					expect(input.value).toBe('123');
				});

				it('should update add thousand separators when going from 3 to 4 digit number', async () => {
					await setup();
					const input = screen.getByRole('textbox') as HTMLInputElement;
					fireEvent.input(input, { target: { value: '123' } });
					fireEvent.input(input, { target: { value: '1234' } });

					expect(input.value).toBe(`1${locale.separators.group}234`);
				});

				it('should remove thousand separators when going from 4 to 3 digit number', async () => {
					await setup();
					const input = screen.getByRole('textbox') as HTMLInputElement;
					fireEvent.input(input, {
						target: { value: `1${locale.separators.group}234` },
					});
					fireEvent.input(input, { target: { value: '123' } });

					expect(input.value).toBe('123');
				});
			});

			describe('thousand to decimal separator', () => {
				beforeEach(async () => {
					await setup({
						thousandSeparatorEnabled: false,
						decimalsEnabled: true,
					});
				});

				it('should NOT convert thousand-separator to decimal-separator when changed char is a thousand-separator and "thousandToDecimalSeparatorEnabled" is disabled', async () => {
					const input = screen.getByRole('textbox') as HTMLInputElement;
					fireEvent.input(input, {
						target: { value: `12${locale.separators.group}34` },
					});

					expect(input.value).toBe(`12${locale.separators.group}34`);
				});

				it('should convert thousand-separator to decimal-separator only when changed char is a thousand-separator', () => {
					const input = screen.getByRole('textbox') as HTMLInputElement;
					fireEvent.input(input, { target: { value: '1234' } });
					input.setSelectionRange(3, 3);
					fireEvent.input(input, {
						target: { value: `12${locale.separators.group}34` },
					});

					expect(input.value).toBe(`12${locale.separators.decimal}34`);
				});

				it('should convert thousand-separator to decimal-separator when added thousand-separator at beginning of input', () => {
					const input = screen.getByRole('textbox') as HTMLInputElement;
					fireEvent.input(input, { target: { value: '1234' } });
					input.setSelectionRange(1, 1);
					fireEvent.input(input, {
						target: { value: `${locale.separators.group}1234` },
					});

					expect(input.value).toBe(`${locale.separators.decimal}1234`);
				});

				it('should not convert thousand-separator to decimal-separator if changed char is not a thousand-separator', () => {
					const input = screen.getByRole('textbox') as HTMLInputElement;
					fireEvent.input(input, { target: { value: '1234' } });
					fireEvent.input(input, { target: { value: '12€34' } });

					expect(input.value).toBe('12€34');
				});

				it('should not convert thousand-separator to decimal-separator if more than 1 changed char', () => {
					const input = screen.getByRole('textbox') as HTMLInputElement;
					fireEvent.input(input, { target: { value: '1234' } });
					fireEvent.input(input, {
						target: { value: `1233234${locale.separators.group}34` },
					});

					expect(input.value).toBe(`1233234${locale.separators.group}34`);
				});
			});

			describe('decimalsEnabled', () => {
				beforeEach(async () => {
					await setup({
						thousandSeparatorEnabled: false,
						thousandToDecimalSeparatorEnabled: false,
					});
				});

				it('should remove decimals from number if decimals not enabled', () => {
					const input = screen.getByRole('textbox') as HTMLInputElement;
					fireEvent.input(input, {
						target: { value: `1234${locale.separators.decimal}12345679` },
					});

					expect(input.value).toBe('1234');
				});

				it('should NOT remove decimals from number if decimals enabled', async () => {
					await setup({ decimalsEnabled: true });
					const input = screen.getByRole('textbox') as HTMLInputElement;
					fireEvent.input(input, {
						target: { value: `1234${locale.separators.decimal}12345679` },
					});

					expect(input.value).toBe(`1234${locale.separators.decimal}12345679`);
				});
			});

			describe('empty string', () => {
				it('should not format input, nor set selection range', () => {
					const input = screen.getByRole('textbox') as HTMLInputElement;
					jest.spyOn(input, 'setSelectionRange');
					expect(input.value).toBe('');
					expect(input.setSelectionRange).not.toHaveBeenCalled();
				});
			});
		});
	});
});
