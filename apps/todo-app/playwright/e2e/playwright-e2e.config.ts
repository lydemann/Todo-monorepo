import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: './mock-tests',
	fullyParallel: true,
	forbidOnly: !!process.env['CI'],
	retries: process.env['CI'] ? 2 : 0,
	workers: process.env['CI'] ? 1 : undefined,
	reporter: 'html',
	use: {
		baseURL: 'http://localhost:4200',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
	},
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},
		// {
		// 	name: 'firefox',
		// 	use: { ...devices['Desktop Firefox'] },
		// },
		// {
		// 	name: 'webkit',
		// 	use: { ...devices['Desktop Safari'] },
		// },
	],
	webServer: {
		command: 'nx run todo-app:serve:mock',
		url: 'http://localhost:4200',
		reuseExistingServer: !process.env['CI'],
	},
});
