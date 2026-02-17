import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/');
  
  await page.getByTestId('text-input').fill('Go for walk');
  await page.getByTestId('text-input').press('Enter');
 
  await page.getByTestId('text-input').fill('Playwright Study');
  await page.getByTestId('text-input').press('Enter');
  
  await page.getByTestId('text-input').fill('ISTQB Cert Study');
  await page.getByTestId('text-input').press('Enter');


  await expect(page.getByText('Go for walk')).toBeVisible();
  await expect(page.getByTestId('todo-list')).toContainText('Playwright Study');

});