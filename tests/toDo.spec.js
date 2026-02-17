import { test, expect } from '@playwright/test';

async function addTodo(page, text) {
    const input = page.getByTestId('text-input');
    await input.pressSequentially(text);
    await input.press('Enter');
}

test('test adding todos @add', async ({ page }) => {
  await page.goto('');
  
  await addTodo(page, 'Go for walk');
  await addTodo(page, 'Playwright Study');  
  await addTodo(page, 'ISTQB Cert Study');

  await expect(page.getByText('Go for walk')).toBeVisible();
  await expect(page.getByTestId('todo-list')).toContainText('Playwright Study');

});