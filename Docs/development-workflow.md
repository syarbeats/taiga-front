# Taiga Development Workflow

This document explains the development workflow for the Taiga front-end application, including setup, development, testing, and deployment.

## Table of Contents

1. [Development Environment Setup](#development-environment-setup)
2. [Project Structure](#project-structure)
3. [Development Workflow](#development-workflow)
4. [Coding Standards](#coding-standards)
5. [Testing](#testing)
6. [Debugging](#debugging)
7. [Building and Deployment](#building-and-deployment)
8. [Continuous Integration](#continuous-integration)
9. [Version Control](#version-control)
10. [Documentation](#documentation)

## Development Environment Setup

To set up the development environment for the Taiga front-end, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/taigaio/taiga-front.git
   cd taiga-front
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure the Application**:
   - Copy the example configuration file:
     ```bash
     cp conf/conf.example.json conf/conf.json
     ```
   - Edit `conf/conf.json` to set the API URL and other configuration options.

4. **Start the Development Server**:
   ```bash
   npm start
   ```

5. **Access the Application**:
   Open your browser and navigate to `http://localhost:9001`.

## Project Structure

The Taiga front-end project is structured as follows:

- **app/**: Contains the application source code
  - **coffee/**: CoffeeScript files
    - **modules/**: Angular modules
  - **partials/**: Jade templates
  - **styles/**: SCSS files
  - **svg/**: SVG icons
  - **images/**: Image assets
  - **fonts/**: Font files
  - **locales/**: Translation files
- **conf/**: Configuration files
- **e2e/**: End-to-end tests
- **docker/**: Docker configuration
- **gulpfile.js**: Gulp build configuration
- **package.json**: NPM package configuration

## Development Workflow

The typical development workflow for the Taiga front-end is as follows:

1. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Implement the Feature**:
   - Write the necessary code in CoffeeScript, Jade, and SCSS files.
   - Follow the coding standards and best practices.

3. **Test the Feature**:
   - Run unit tests:
     ```bash
     npm test
     ```
   - Run end-to-end tests:
     ```bash
     npm run e2e
     ```

4. **Commit the Changes**:
   ```bash
   git add .
   git commit -m "Add my feature"
   ```

5. **Push the Changes**:
   ```bash
   git push origin feature/my-feature
   ```

6. **Create a Pull Request**:
   - Go to the GitHub repository and create a pull request from your feature branch to the main branch.
   - Provide a detailed description of the changes and any related issues.

7. **Review and Merge**:
   - Wait for code review and address any feedback.
   - Once approved, the pull request will be merged into the main branch.

## Coding Standards

The Taiga front-end follows these coding standards:

### CoffeeScript

- Use 4 spaces for indentation.
- Use camelCase for variable and function names.
- Use PascalCase for class names.
- Use snake_case for file names.
- Add comments for complex logic.
- Follow the [CoffeeScript Style Guide](https://github.com/polarmobile/coffeescript-style-guide).

### Jade

- Use 4 spaces for indentation.
- Use kebab-case for class and ID names.
- Use semantic HTML elements.
- Keep templates simple and focused on presentation.

### SCSS

- Use 4 spaces for indentation.
- Use kebab-case for class and ID names.
- Use nesting for related styles, but avoid excessive nesting.
- Use variables for colors, fonts, and other repeated values.
- Follow the [SCSS Style Guide](https://sass-guidelin.es/).

### Angular

- Follow the [AngularJS Style Guide](https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md).
- Use directives for reusable components.
- Use services for business logic and data access.
- Use controllers for view logic.
- Use the controllerAs syntax.

## Testing

The Taiga front-end uses several testing frameworks:

### Unit Tests

Unit tests are written using Mocha, Chai, and Sinon. They test individual components in isolation.

To run unit tests:

```bash
npm test
```

Unit tests are located in the same directory as the code they test, with a `.spec.coffee` suffix.

### End-to-End Tests

End-to-end tests are written using Protractor and Jasmine. They test the application as a whole, simulating user interactions.

To run end-to-end tests:

```bash
npm run e2e
```

End-to-end tests are located in the `e2e/` directory.

### Continuous Integration Tests

Continuous integration tests are run automatically on pull requests and commits to the main branch.

To run CI tests:

```bash
npm run ci:test
```

## Debugging

To debug the Taiga front-end, you can use the following tools and techniques:

### Browser Developer Tools

- Use the browser's developer tools to inspect the DOM, debug JavaScript, and monitor network requests.
- Use the AngularJS Batarang extension for Chrome to inspect AngularJS components.

### Logging

- Use `console.log()`, `console.info()`, `console.warn()`, and `console.error()` for logging.
- Enable debug mode in the configuration to see more detailed logs:
  ```json
  {
    "debug": true
  }
  ```

### Source Maps

Source maps are generated during the build process, allowing you to debug the original CoffeeScript code instead of the compiled JavaScript.

## Building and Deployment

To build the Taiga front-end for production, follow these steps:

1. **Build the Application**:
   ```bash
   gulp deploy
   ```

2. **Deploy the Application**:
   - Copy the contents of the `dist/` directory to your web server.
   - Configure your web server to serve the application.

### Docker Deployment

You can also deploy the Taiga front-end using Docker:

1. **Build the Docker Image**:
   ```bash
   docker build -t taiga-front .
   ```

2. **Run the Docker Container**:
   ```bash
   docker run -p 80:80 taiga-front
   ```

## Continuous Integration

The Taiga front-end uses GitHub Actions for continuous integration. The CI pipeline includes:

1. **Linting**: Checking code style and formatting.
2. **Unit Tests**: Running unit tests.
3. **End-to-End Tests**: Running end-to-end tests.
4. **Build**: Building the application for production.

The CI pipeline runs on pull requests and commits to the main branch.

## Version Control

The Taiga front-end uses Git for version control and follows these practices:

### Branching Strategy

- **main**: The main branch contains the production-ready code.
- **feature/\***: Feature branches are used for developing new features.
- **bugfix/\***: Bugfix branches are used for fixing bugs.
- **release/\***: Release branches are used for preparing releases.

### Commit Messages

Commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Where `<type>` is one of:
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Changes that do not affect the meaning of the code
- **refactor**: Code changes that neither fix a bug nor add a feature
- **perf**: Performance improvements
- **test**: Adding or fixing tests
- **chore**: Changes to the build process or auxiliary tools

### Pull Requests

Pull requests should:
- Have a clear title and description
- Reference related issues
- Pass all CI checks
- Be reviewed by at least one team member

## Documentation

The Taiga front-end documentation includes:

### Code Documentation

- Add comments to explain complex logic.
- Use JSDoc-style comments for functions and classes.
- Keep comments up-to-date with code changes.

### API Documentation

- Document API endpoints and parameters.
- Explain request and response formats.
- Provide examples of API usage.

### User Documentation

- Provide user guides and tutorials.
- Explain features and functionality.
- Include screenshots and examples.

### Contributing Guidelines

- Explain how to contribute to the project.
- Describe the development workflow.
- Provide coding standards and best practices.
