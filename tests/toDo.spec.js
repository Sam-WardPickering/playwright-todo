import { test, expect } from '@playwright/test';

async function addTodo(page, text) {
    const input = page.getByTestId('text-input');
    await input.pressSequentially(text);
    await input.press('Enter');
};

const todos = [
    'Go for walk',
    'Playwright Study',
    'ISTQB Cert Study'
]

test('test adding todos @add', async ({ page }) => {
  await page.goto('');

  for(const todo of todos) {
    await addTodo(page, todo);
  };

  await expect(page.getByText('Go for walk')).toBeVisible();
  await expect(page.getByTestId('todo-list')).toContainText('Playwright Study');

});