import type { Meta, StoryObj } from '@storybook/angular';
import { SelectComponent } from './select.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SelectComponent> = {
	component: SelectComponent,
	title: 'SelectComponent',
};
export default meta;
type Story = StoryObj<SelectComponent>;

export const Primary: Story = {
	args: {
		placeholder: '',
	},
};

export const Heading: Story = {
	args: {
		placeholder: '',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/select works!/gi)).toBeTruthy();
	},
};
