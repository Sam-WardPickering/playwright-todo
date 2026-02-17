import { test, expect } from '@playwright/test';

test('test adding todos', async ({ page }) => {
  await page.goto('');

  const newTodo = page.getByTestId('text-input');
  
  await newTodo.fill('Go for walk');
  await newTodo.press('Enter');
 
  await newTodo.fill('Playwright Study');
  await newTodo.press('Enter');
  
  await newTodo.fill('ISTQB Cert Study');
  await newTodo.press('Enter');


  await expect(page.getByText('Go for walk')).toBeVisible();
  await expect(page.getByTestId('todo-list')).toContainText('Playwright Study');

});