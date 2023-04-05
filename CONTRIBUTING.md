# How to contribute to CoCast

Thank you for considering contributing to CoCast, your contributions are highly appreciated! This document outlines the guidelines for contributing to this project.

## Reporting issues

If you come across any issues while using CoCast, please report them using the following steps:

1. Check if the issue has already been reported by searching the existing issues.
2. Verify that you are using the latest version of CoCast, if not, try upgrading CoCast to see if the issue has already been resolved in the latest releases or the latest code in the repository.
3. If the issue has not been reported yet, you can create a new issue. In the issue description, please include the following information:
   - Describe what you expected to happen.
   - Describe what actually happened, and include all console error messages if possible.
   - List the CoCast and Node.js versions you used.

## Contributing Code

Before contributing any code, make sure you assign yourself to an issue or open a new issue to prevent duplication of effort. Here's how you can contribute code to CoCast:

### Project setup:

Fork the CoCast repository. Clone the repository to your local machine and navigate to the CoCast directory. Install all necessary packages for the CoCast project by running the following command:

```
npm install
```

### Creating a feature branch

Pull the latest updates from the repository and checkout a new branch.

```
git checkout -b your-branch-name
```

### Development server

Make your desired changes to the codebase. Test your changes by running the development server:

```
npm run dev
```

### Test and Format

Ensure all tests pass and use a code formatter to format the code. Whenever possible, add tests related to your changes. CoCast uses Vitest for testing and Prettier to format the code.

Run all tests:

```
npm run test
```

Check the test coverage:

```
npm run coverage
```

Format code:

```
npm run format
```

Lint the code using ESLint:

```
npm run lint
```

### Build and Preview

To build and preview the production code on your local machine, run the following commands:

```
npm run build
npm run preview
```

### Creating a Pull Request

Before creating a pull request (PR), make sure to commit all your changes and sync with the upstream repository. Once you have done so, push your commits to your fork on GitHub and create a pull request. Additionally, please include a link to the issue that your PR is addressing in the pull request.
