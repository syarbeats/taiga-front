# Taiga Frontend Technical Stack & Project Structure

## Core Technologies

### Frontend Framework
- AngularJS 1.5.10 (Legacy Angular.js)
- Uses various Angular modules:
  - angular-animate
  - angular-aria
  - angular-route
  - angular-sanitize
  - angular-translate (for internationalization)

### Build System & Development Tools
- Gulp 4.x (Task runner)
- Node.js & NPM (Package management)
- Babel (ES6+ transpilation)
- SCSS/SASS (Styling)
- Jade (Template engine)

### Testing Framework
- Karma (Test runner)
- Mocha (Testing framework)
- Chai (Assertion library)
- E2E Testing capabilities

### UI/UX Libraries
- jQuery 2.x
- Bourbon (SASS mixin library)
- Lodash (Utility library)
- Moment.js (Date handling)
- Dragula (Drag & drop)
- Flot (Charting)
- Pikaday (Date picker)
- Showdown (Markdown parsing)
- Intro.js (User onboarding)

## Project Structure

```
taiga-front/
├── app/                    # Main application code
├── app-loader/            # Application loader
├── conf/                  # Configuration files
├── docker/               # Docker-related files
├── Docs/                 # Documentation
├── e2e/                  # End-to-end tests
├── extras/               # Additional resources
├── scripts/              # Build and utility scripts
├── gulpfile.js           # Gulp build configuration
├── karma.conf.js         # Karma test configuration
└── package.json          # Project dependencies and scripts
```

## Build & Development Tools

### Gulp Tasks
- SCSS linting
- Template caching
- Asset optimization
- Live reload
- Source maps generation
- CSS autoprefixing
- JavaScript minification
- Image optimization

### Development Features
- Live reload support
- Source maps for debugging
- SCSS/SASS preprocessing
- ES6+ support via Babel
- Template caching
- Asset optimization pipeline

## Testing Infrastructure
- Unit testing with Karma/Mocha
- E2E testing support
- Chrome Headless CI support
- Test coverage reporting

## Additional Features
- Internationalization support via angular-translate
- Markdown support
- Rich text editing
- Drag and drop functionality
- Chart visualization
- User onboarding tours
- Error tracking (Raven.js)
- Infinite scrolling
- Custom HTML editor

This project is a robust AngularJS application following best practices for build tooling, testing, and development workflow. It uses a comprehensive set of modern frontend tools while maintaining compatibility with legacy AngularJS architecture.