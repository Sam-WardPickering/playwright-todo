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

    await test.step('Add todos', async () => {
        for(const todo of todos) {
            await addTodo(page, todo);
        };
    });

    await test.step('Verify todos', async () => {
        await expect(page.getByTestId('todo-item')).toHaveText(todos);
    });

    await test.step('Complete todos', async () => {
        for(const todo of todos) {
            await completeTodo(page, todo);
        };
    });

    await test.step('Verify no active todos', async () => {
        await page.getByRole('link', { name: 'Active' }).click();
        await expect(page.getByTestId('todo-item')).toHaveCount(0);
    });

    await test.step('Verify completed todos', async () => {
        await page.getByRole('link', { name: 'Completed' }).click();
        await expect(page.getByTestId('todo-item')).toHaveCount(todos.length);
    });
    
});