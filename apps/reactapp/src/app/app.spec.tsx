import { cleanup, render } from '@testing-library/react';
import React from 'react';

import App from './app';

describe('App', () => {
	afterEach(cleanup);

	it('should render successfully', () => {
		const { baseElement } = render(<App />);

		expect(baseElement).toBeTruthy();
	});

	it('should have a greeting as the title', () => {
		const { getByText } = render(<App />);

		expect(getByText('Welcome to React Todo App')).toBeTruthy();
	});
});
