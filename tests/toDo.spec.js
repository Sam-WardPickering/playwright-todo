import { test, expect } from '@playwright/test';
import todoData from '../todos.json' assert { type: 'json' };

const todos = todoData.todoListItems;

async function addTodo(page, text) {
    const input = page.getByTestId('text-input');
    await input.pressSequentially(text);
    await input.press('Enter');
};


async function completeTodo(page, text) {
    const todoItem = page.getByRole('listitem').filter({ hasText: text }).getByTestId('todo-item-toggle');
    await todoItem.check();
};

test('adds & completes todos', async ({ page }) => {
    await page.goto('');

    const items = page.getByTestId('todo-item');
    const counter = page.locator('.todo-count');


    await test.step('Add todos', async () => {
        for(const todo of todos) {
            await addTodo(page, todo);
        };
    });

    await test.step('Verify todos', async () => {
        await expect(items).toHaveText(todos);
        await expect(counter).toHaveText(new RegExp(`^${todos.length}\\s+item`));
    });

    await test.step('Complete todos', async () => {
        for(const todo of todos) {
            await completeTodo(page, todo);
        };
    });

    await test.step('Verify no active todos', async () => {
        await page.getByRole('link', { name: 'Active' }).click();
        await expect(items).toHaveCount(0);

        await expect(counter).toHaveText(/^0\s+item/);
    });

    await test.step('Verify completed todos', async () => {
        await page.getByRole('link', { name: 'Completed' }).click();
        await expect(items).toHaveCount(todos.length);
        await expect(items).toHaveText(todos);
    });
    
});