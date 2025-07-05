# Getting Started with Jest for TypeScript

This document provides step-by-step instructions for setting up and using [Jest](https://jestjs.io/) for unit testing TypeScript projects.

## Prerequisites
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (included with Node.js)
- A TypeScript project

## 1. Install Jest and TypeScript Support

Run the following commands in your terminal:

```
npm install jest @types/jest ts-jest --save-dev
```

This installs:
- `jest`: The Jest testing framework
- `@types/jest`: TypeScript type definitions for Jest
- `ts-jest`: A Jest transformer for TypeScript

## 2. Configure Jest for TypeScript

Create a `jest.config.js` file in your project root:

```js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
```

## 3. Add Test Script

Add or update the test script in your `package.json`:

```json
"scripts": {
  "test": "jest",
}
```

## 4. Writing Your First Test

Create a test file with a `.test.ts` extension.

For example, create a dummy test file:

```typescript
describe("Dummy Test", () => {
    test("One should be one", () => {
        expect(1).toBe(1);
    });
});
```

## 5. Running Tests

Run your tests with:

```
npm test
```

For additional information, refer to the [Jest documentation](https://jestjs.io/docs/getting-started).