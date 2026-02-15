---
name: page-objects-and-apis
description: Guidance for creating Playwright page objects and API helpers in this repo.
---

# Page Objects and APIs

Use this skill when adding or updating page objects or API helper modules.

## Page objects
- Implement classes that accept Playwright Page in the constructor.
- Define Locator fields in the constructor and reuse them in methods.
- Prefer getByRole and data-test selectors for stability.
- Keep methods focused on user actions or state checks.

### Page object skeleton
```ts
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  private page: Page;
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
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
```

## API helpers
- Use shared/api/apiRequest for HTTP calls.
- Accept an optional RetryConfig and pass it through to apiRequest.
- Return response data and let handleError raise on failures.

### API helper skeleton
```ts
import { apiRequest, RetryConfig } from '../../../shared/api/apiRequest';

export async function getProducts(retryConfig?: RetryConfig) {
  const config = {
    headers: { 'Content-Type': 'application/json' },
    ...retryConfig,
  };

  return await apiRequest('get', 'https://fakestoreapi.com/products', config);
}
```
