import { test, expect } from '@playwright/test';

test('test adding todos @add', async ({ page }) => {
  await page.goto('');

  const newTodo = page.getByTestId('text-input');
  
  await newTodo.pressSequentially('Go for walk');
  await newTodo.press('Enter');
 
  await newTodo.pressSequentially('Playwright Study');
  await newTodo.press('Enter');
  
  await newTodo.pressSequentially('ISTQB Cert Study');
  await newTodo.press('Enter');


  await expect(page.getByText('Go for walk')).toBeVisible();
  await expect(page.getByTestId('todo-list')).toContainText('Playwright Study');

});