![Playwright CI](https://github.com/jackthanakrit/playwright-scalable-framework/actions/workflows/test_pipeline.yml/badge.svg)  
🔍 [View latest Allure Report](https://jackthanakrit.github.io/playwright-scalable-framework/awesome/index.html)

## 📚 Table of Contents
- [📚 Table of Contents](#-table-of-contents)
- [📖 Project Overview](#-project-overview)
- [🤖 AI-Assisted Workflow](#-ai-assisted-workflow)
- [⚙️ Setup](#️-setup)
- [📂 Folder Structure](#-folder-structure)
- [📁 Folder Responsibilities](#-folder-responsibilities)
  - [📁 apps/](#-apps)
  - [📁 shared/](#-shared)
  - [📁 config/](#-config)
- [🚀 Usage](#-usage)
  - [Running Tests](#running-tests)
  - [Debugging](#debugging)
- [📜 Additional Resources](#-additional-resources)

---

## 📖 Project Overview

This project follows a scalable, modular test automation structure using Playwright. It is designed to support testing multiple websites/apps with shared logic and feature-based execution.

---

## 🤖 AI-Assisted Workflow

This repo is set up to work well with GitHub Copilot in VS Code. Use the guidance below to keep generated code aligned with existing patterns.

**Where Copilot should look first**
- Page objects and UI flows in `apps/*/pages/`
- API helpers in `apps/*/api/` and `shared/api/`
- Existing tests in `apps/*/tests/`

**Suggested prompts**
- "Add a Playwright test for the login happy path using the existing page object."
- "Create a new page object for the checkout page following current conventions."
- "Add an API helper that wraps the products endpoint like other helpers."

**Guardrails**
- Reuse existing helpers and utilities before creating new ones.
- Keep test data deterministic; avoid random values unless required.
- Keep selectors stable and use page object methods rather than inline selectors in tests.
- Prefer the app-specific folders under `apps/` for new tests and page objects.

For deeper guidance, see `.github/copilot-instructions.md`.

---

## ⚙️ Setup

Follow these steps to set up the project:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/jackthanakrit/playwright-scalable-framework.git
   cd playwright-scalable-framework
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the root directory.
   - Add necessary environment variables (e.g., credentials, API keys).

4. **Run Tests**:
   - Run all tests:
     ```bash
     npx playwright test
     ```
   - Run tests in headed mode:
     ```bash
     npx playwright test --headed
     ```

---

## 📂 Folder Structure

```plaintext
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
```

---

## 📁 Folder Responsibilities

### 📁 apps/
Contains individual application domains (e.g., `website-a`, `website-b`). Each app has its own isolated test files, page objects, fixtures, and utilities.

- **pages/**: Page Object Model (POM) classes for UI interaction.
- **components/**: Reusable UI components shared across pages.
- **tests/**: All Playwright tests live here, organized by feature.
- **fixtures/**: Reusable test setup logic using `test.extend()`.
- **utils/**: Utility functions specific to each app.

### 📁 shared/
Contains utilities, data, and APIs shared across multiple apps.

- **api/**: Reusable API clients and backend helpers.
- **utils/**: Generic utility functions (e.g., Faker generators, date/time handling).

### 📁 config/
Contains general-purpose test framework configuration.

- Examples: `database.config.ts`, `testrail.config.ts`.

---

## 🚀 Usage

### Running Tests
- Run all tests:
  ```bash
  npx playwright test
  ```
- Run tests for a specific project:
  ```bash
  npx playwright test --project=website-a
  ```
- Run a specific test file:
  ```bash
  npx playwright test apps/website-a/tests/login/login.spec.ts
  ```

### Debugging
- Run tests in headed mode:
  ```bash
  npx playwright test --headed
  ```
- Use `page.pause()` to inspect the browser during test execution.

---

## 📜 Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Allure Report Documentation](https://docs.qameta.io/allure/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)