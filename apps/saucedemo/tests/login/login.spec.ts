import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";

test.describe.configure({ mode: 'parallel' });
test('user can log in with standard user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Go to the login page', async () => {
        await loginPage.goto();
    });
    await test.step('Login with standard user', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
    });
    await test.step('Verify inventory page is', async () => {
        await expect(page).toHaveURL('inventory.html');
    });
});

test('locked out user should see error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Go to the login page', async () => {
        await loginPage.goto();
    });
    await test.step('Login with locked out user', async () => {
        await loginPage.login('locked_out_user', 'secret_sauce');
    });
    await test.step('Verify message error is shown', async () => {
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('locked out');
    });
});

test('problem user can log in but UI has issues', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Go to login page', async () => {
        await loginPage.goto();
    });
    await test.step('Login with problem_user', async () => {
        await loginPage.login('problem_user', 'secret_sauce');
    });
    await test.step('Verify user is redirected to inventory', async () => {
        await expect(page).toHaveURL('inventory.html');
    });
    await test.step('Check if product image is broken', async () => {
        const productImage = page.locator('.inventory_item_img img').first();
        await expect(productImage).toHaveAttribute('src', /sl-404\.[a-z0-9]+\.jpg/);
    });
});

test('performance glitch user login duration is above normal', async ({ page }) => {
    const loginPage = new LoginPage(page);
    let loginDuration: number = 0;
    await test.step('Go to login page', async () => {
        await loginPage.goto();
    });
    await test.step('Login with performance_glitch_user and measure duration', async () => {
        const start = Date.now();
        await loginPage.login('performance_glitch_user', 'secret_sauce');
        await page.waitForURL('inventory.html', { timeout: 15000 });
        loginDuration = Date.now() - start;
    });
    await test.step(`Log login duration (${loginDuration}ms)`, async () => {
        console.log(`Login duration for performance_glitch_user: ${loginDuration}ms`);
    });
    await test.step('Assert that login duration is slower than normal', async () => {
        expect(loginDuration).toBeGreaterThan(1000);
    });
    await test.step('Verify inventory list is visible', async () => {
        await expect(page.locator('.inventory_list')).toBeVisible();
    });
});

test('invalid credentials should not allow login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Go to login page', async () => {
        await loginPage.goto();
    });
    await test.step('Try login with invalid credentials', async () => {
        await loginPage.login('invalid_user', 'wrong_password');
    });
    await test.step('Verify error message is shown', async () => {
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText('Username and password do not match');
    });
});
