import { test, expect } from '@playwright/test';

async function addTodo(page, text) {
    const input = page.getByTestId('text-input');
    await input.pressSequentially(text);
    await input.press('Enter');
};


async function completeTodo(page, text) {
    const todoItem = await page.getByRole('listitem').filter({ hasText: text }).getByTestId('todo-item-toggle');
    todoItem.check();
};


const todos = [
    'Go for walk',
    'Playwright Study',
    'ISTQB Cert Study',
    'Grocery Shopping',
    'Meditate'

];


test('test adding todos @add', async ({ page }) => {
    await page.goto('');

    // Add todos
    for(const todo of todos) {
        await addTodo(page, todo);
    };

    await expect(page.getByText('Go for walk')).toBeVisible();
    await expect(page.getByTestId('todo-list')).toContainText('Playwright Study');

    // Complete todos
    for(const todo of todos) {
        await completeTodo(page, todo);
    }

    const toDoList = page.getByTestId('todo-list');
    expect(toDoList).toBeEmpty();

});