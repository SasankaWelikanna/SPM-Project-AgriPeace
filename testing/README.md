# AgriPeace Test Automation Framework

This directory contains automated testing tools and scripts for the AgriPeace farming management application.

## Test Automation Architecture

The testing framework consists of two main components:

1. **Jest** - For unit tests, API tests, and integration tests
2. **Cypress** - For end-to-end (E2E) tests and user interface testing

## Directory Structure

```
testing/
├── cypress/              # Cypress test files
│   ├── e2e/             # End-to-end tests
│   │   ├── admin/       # Admin-specific tests
│   │   ├── auth/        # Authentication tests
│   │   └── farmer/      # Farmer-specific tests
│   ├── fixtures/        # Test data for Cypress tests
│   ├── support/         # Support files for Cypress tests
│   │   ├── commands.js  # Custom Cypress commands
│   │   ├── e2e.js       # E2E test configuration
│   │   └── component.js # Component test configuration
│   └── component/       # Component tests
├── jest/                # Jest test files
│   ├── api/             # API tests
│   ├── ui/              # UI component tests
│   ├── __mocks__/       # Mock files for Jest tests
│   └── setupTests.js    # Jest setup configuration
├── cypress.config.js    # Cypress configuration file
├── jest.config.js       # Jest configuration file
└── package.json         # Project dependencies and scripts
```

## Installation

To install the testing dependencies:

```bash
cd /path/to/SPM-Project/testing
npm install
```

## Running Tests

### Jest Tests

To run all Jest tests:

```bash
npm run test:jest
```

To run API tests only:

```bash
npm run test:api
```

### Cypress Tests

To open Cypress test runner:

```bash
npm run test:cypress
```

To run Cypress tests in headless mode:

```bash
npm run test:cypress:headless
```

## Test Scenarios

### API Tests

1. Plant Management API - CRUD operations for plants
   - Create new plant
   - Retrieve all plants
   - Retrieve specific plant
   - Update plant
   - Delete plant
   - Negative tests (invalid input handling)

### E2E Tests

1. Authentication
   - Login as user or admin
   - Login validation
   - Registration process

2. Admin Functions
   - Plant management (CRUD)
   - Fertilizer management
   - User management

3. Farmer Functions
   - Location management
   - Crop management
   - Fertilizer calculation

## Creating New Tests

### Adding a Jest Test

1. Create a new `.test.js` file in the appropriate directory under `jest/`
2. Write your test using the Jest testing framework
3. Run the test using `npm run test:jest`

### Adding a Cypress Test

1. Create a new `.cy.js` file in the appropriate directory under `cypress/e2e/`
2. Write your test using the Cypress testing framework
3. Run the test using `npm run test:cypress`

## Best Practices

1. Follow the naming convention: `featureName.test.js` for Jest and `featureName.cy.js` for Cypress
2. Use descriptive test and function names
3. Keep tests focused on a single functionality
4. Use fixtures for test data
5. Clean up any test data created during tests
6. Keep tests independent of each other (don't rely on previous test state)