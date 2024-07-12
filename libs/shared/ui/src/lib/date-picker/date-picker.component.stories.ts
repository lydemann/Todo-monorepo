import type { Meta, StoryObj } from '@storybook/angular';
import { DatePickerComponent } from './date-picker.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<DatePickerComponent> = {
	component: DatePickerComponent,
	title: 'DatePickerComponent',
};
export default meta;
type Story = StoryObj<DatePickerComponent>;

export const Primary: Story = {
	args: {
		errorMessage: 'Invalid input',
		placeholder: 'Choose a date',
		showError: false,
	},
};

export const Heading: Story = {
	args: {
		errorMessage: 'Invalid input',
		placeholder: 'Choose a date',
		showError: false,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/date-picker works!/gi)).toBeTruthy();
	},
};
