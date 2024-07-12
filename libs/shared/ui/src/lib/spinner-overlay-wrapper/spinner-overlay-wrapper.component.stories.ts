import type { Meta, StoryObj } from '@storybook/angular';
import { SpinnerOverlayWrapperComponent } from './spinner-overlay-wrapper.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<SpinnerOverlayWrapperComponent> = {
	component: SpinnerOverlayWrapperComponent,
	title: 'SpinnerOverlayWrapperComponent',
};
export default meta;
type Story = StoryObj<SpinnerOverlayWrapperComponent>;

export const Primary: Story = {
	args: {},
};

export const Heading: Story = {
	args: {},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		expect(canvas.getByText(/spinner-overlay-wrapper works!/gi)).toBeTruthy();
	},
};
