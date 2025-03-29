# Playwright Best Practices

# 🎯 Project Structure — Folder Responsibilities
This project follows a scalable, modular test automation structure using Playwright. Each folder is organized by purpose to support testing multiple websites/apps with shared logic and strategy-based execution.

## Project Structure
The project is organized as follows:

project-root/
├── apps/
│   ├── website-a/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── tests/
│   │   │   └── featureA/
│   │   ├── utils/
│   │   └── fixtures/
│   ├── website-b/
│   │   └── ...
├── shared/
│   ├── api/
│   └── utils/
├── config/
│   └── db.config.ts

## 📁 apps/

Contains individual application domains (e.g. `website-a`, `website-b`).  
Each app has its own isolated test files, page objects, fixtures, and utilities.

### ├── pages/
Holds Page Object Model (POM) classes representing full pages for UI interaction.
- Each file = one page (e.g. `login.page.ts`, `dashboard.page.ts`)
- Contains locators and actions, no assertions

### ├── components/
Reusable UI components shared across pages.
- Example: header, sidebar, modals, etc.
- Promotes DRY for shared UI behaviors

### ├── tests/
Actual Playwright test specs.
- Organized by feature (e.g. `login/`, `checkout/`, `cart/`)
- Supports tagging (`@smoke`, `@regression`) for flexible execution

### ├── fixtures/
Reusable test setup logic using Playwright’s `test.extend()` system.
- Used for login, session state, or custom test contexts

### ├── utils/
Utility functions specific to each app.
- Includes local test helpers, data generators, or transformations

## 📁 shared/

Contains utilities, data, and APIs that are shared across multiple apps.

### ├── api/
Reusable API clients and backend helpers.
- Used to create/delete users, setup test data via HTTP calls

### ├── utils/
Generic utility functions.
- Faker generators, date/time handling, file reading, performance timers, etc.

## 📁 config/

Contains general-purpose test framework configuration.

### Examples:
- `database.config.ts`: Database connection settings used in setup scripts
- `testrail.config.ts`: API details or mapping for TestRail integration

## Best Practices for Maintenance

### 1. **Follow the Page Object Model (POM)**
   - Keep all page-specific selectors and actions in the `pages/` directory.
   - Example: Use `LoginPage` in `login.page.ts` to encapsulate login-related actions.

### 2. **Organize Tests by Feature**
   - Place tests in feature-specific directories under `apps/saucedemo/tests/`.
   - Example: Login tests go in `apps/saucedemo/tests/login/`.

### 3. **Use Utilities for Reusability**
   - Place reusable functions in `shared/utils/` or `apps/saucedemo/utils/`.
   - Example: Common helper functions like `waitForElement` or `generateRandomString`.

### 4. **Environment Variables**
   - Store sensitive data like credentials in the `.env` file.
   - Use `dotenv` to load environment variables in `playwright.config.ts`.

### 5. **Linting and Formatting**
   - Use ESLint for consistent code quality. Configuration is in `eslint.config.mjs`.
   - Run `npm run lint` to check for linting issues.

### 6. **CI/CD Integration**
   - Tests are automatically executed via GitHub Actions (`.github/workflows/test_pipeline.yml`).
   - Ensure all tests pass before merging changes.

### 7. **Test Reporting**
   - View test results in the `playwright-report/` directory.
   - Use the HTML report (`index.html`) for detailed insights.

### 8. **Version Control**
   - Add new files to `.gitignore` if they should not be committed (e.g., `node_modules`, `.env`).
   - Use meaningful commit messages.

### 9. **Run Tests Locally**
   - Use the following commands to run tests:
     - Run all tests: `npx playwright test`
     - Run tests for a specific project: `npx playwright test --project=saucedemo`
     - Run a specific test file: `npx playwright test apps/saucedemo/tests/login/login.spec.ts`

### 10. **Debugging**
   - Use Playwright's debugging tools:
     - Run tests in headed mode: `npx playwright test --headed`
     - Use `page.pause()` to inspect the browser during test execution.

---

### Responsibility