import { test, expect } from '@playwright/test';

async function addTodo(page, text) {
    const input = page.getByTestId('text-input');
    await input.pressSequentially(text);
    await input.press('Enter');
};


async function completeTodo(page, text) {
    const todoItem = page.getByRole('listitem').filter({ hasText: text }).getByTestId('todo-item-toggle');
    await todoItem.check();
};


const todos = [
    'Go for walk',
    'Playwright Study',
    'ISTQB Cert Study',
    'Grocery Shopping',
    'Meditate'

];


test('adds & completes todos', async ({ page }) => {
    await page.goto('');

    // Add todos
    for(const todo of todos) {
        await addTodo(page, todo);
    };

    // Verify todos
    await expect(page.getByTestId('todo-item')).toHaveText(todos);

    // Confirm expected number of todos exist
    await expect(page.getByTestId('todo-item')).toHaveCount(todos.length);

    // Complete todos
    for(const todo of todos) {
        await completeTodo(page, todo);
    };

    // Navigate to active todos
    await page.getByRole('link', { name: 'Active' }).click();

    // Confirm no active todos
    await expect(page.getByTestId('todo-item')).toHaveCount(0);

    // await page.pause();

});