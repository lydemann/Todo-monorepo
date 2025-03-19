import { test, expect } from '@playwright/test';

test('should load the todo app', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { name: 'TODO app' })).toBeVisible();
});
