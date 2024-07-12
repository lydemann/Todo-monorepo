import type { Meta, StoryObj } from '@storybook/angular';
import { CheckboxComponent } from './checkbox.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<CheckboxComponent> = {
	component: CheckboxComponent,
	title: 'CheckboxComponent',
};
export default meta;
type Story = StoryObj<CheckboxComponent>;

export const Primary: Story = {
	args: {
		label: '',
		disabled: false,
		checked: false,
		labelPosition: 'after',
		indeterminate: false,
	},
};

export const Heading: Story = {
	args: {
		label: '',
		disabled: false,
		checked: false,
		labelPosition: 'after',
		indeterminate: false,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/checkbox works!/gi)).toBeTruthy();
	},
};
