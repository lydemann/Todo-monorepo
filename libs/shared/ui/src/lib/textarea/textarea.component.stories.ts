import type { Meta, StoryObj } from '@storybook/angular';
import { TextareaComponent } from './textarea.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<TextareaComponent> = {
	component: TextareaComponent,
	title: 'TextareaComponent',
};
export default meta;
type Story = StoryObj<TextareaComponent>;

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
		expect(canvas.getByText(/textarea works!/gi)).toBeTruthy();
	},
};
