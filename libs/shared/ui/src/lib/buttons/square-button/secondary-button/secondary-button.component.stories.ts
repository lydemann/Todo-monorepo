import type { Meta, StoryObj } from '@storybook/angular';
import { SecondaryButtonComponent } from './secondary-button.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SecondaryButtonComponent> = {
	component: SecondaryButtonComponent,
	title: 'SecondaryButtonComponent',
};
export default meta;
type Story = StoryObj<SecondaryButtonComponent>;

export const Primary: Story = {
	args: {},
};

export const Heading: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/secondary-button works!/gi)).toBeTruthy();
	},
};
