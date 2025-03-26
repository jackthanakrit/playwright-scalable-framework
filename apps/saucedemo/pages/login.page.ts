import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private page: Page;
    private url = 'https://www.saucedemo.com/';
    private usernameInput: Locator;
    private passwordInput: Locator;
    private loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async goto() {
        await this.page.goto(this.url);
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}