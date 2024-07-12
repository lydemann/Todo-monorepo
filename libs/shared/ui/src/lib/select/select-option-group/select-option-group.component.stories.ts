import type { Meta, StoryObj } from '@storybook/angular';
import { SelectOptionGroupComponent } from './select-option-group.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SelectOptionGroupComponent> = {
	component: SelectOptionGroupComponent,
	title: 'SelectOptionGroupComponent',
};
export default meta;
type Story = StoryObj<SelectOptionGroupComponent>;

export const Primary: Story = {
	args: {
		label: '',
	},
};

export const Heading: Story = {
	args: {
		label: '',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/select-option-group works!/gi)).toBeTruthy();
	},
};
