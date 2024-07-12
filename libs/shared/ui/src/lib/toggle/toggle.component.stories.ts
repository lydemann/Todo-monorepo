import type { Meta, StoryObj } from '@storybook/angular';
import { ToggleComponent } from './toggle.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ToggleComponent> = {
	component: ToggleComponent,
	title: 'ToggleComponent',
};
export default meta;
type Story = StoryObj<ToggleComponent>;

export const Primary: Story = {
	args: {
		isIcon: false,
		labelPosition: 'after',
		labelTextOn: '',
		labelTextOff: '',
		disabled: false,
		checked: false,
	},
};

export const Heading: Story = {
	args: {
		isIcon: false,
		labelPosition: 'after',
		labelTextOn: '',
		labelTextOff: '',
		disabled: false,
		checked: false,
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/toggle works!/gi)).toBeTruthy();
	},
};
