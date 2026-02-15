---
name: playwright-test-authoring
description: Guidance for writing Playwright UI and API tests in this repo. Use when creating or updating tests.
---

# Playwright Test Authoring

Use this skill when writing new tests or modifying existing ones.

## Project layout
- All tests live under apps/<app>/tests/.
- Page objects live under apps/<app>/pages/.
- API helpers live under apps/<app>/api/ and shared/api/.

## Conventions to follow
- Use @playwright/test with test and expect.
- Wrap steps with test.step for readability and reports.
- Prefer page object methods over inline selectors.
- Keep data deterministic; avoid random values unless required.
- Use stable selectors (getByRole or data-test) rather than brittle CSS.

## Suggested test skeleton
```ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test('user can log in with standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await test.step('Go to the login page', async () => {
    await loginPage.goto();
  });

  await test.step('Login with standard user', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
  });

  await test.step('Verify inventory page is shown', async () => {
    await expect(page).toHaveURL('inventory.html');
  });
});
```

## API test guidance
- Call helpers from apps/<app>/api/ or shared/api/.
- If you need retries, pass a RetryConfig to the helper.
- Validate response shape with expect and basic type checks.
