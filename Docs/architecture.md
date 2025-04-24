# Taiga Front-end Architecture

This document provides a detailed explanation of the Taiga front-end architecture, including its components, patterns, and design decisions.

## Table of Contents

1. [Overview](#overview)
2. [Architectural Patterns](#architectural-patterns)
3. [Module Structure](#module-structure)
4. [Data Flow](#data-flow)
5. [Component Communication](#component-communication)
6. [State Management](#state-management)
7. [Authentication and Authorization](#authentication-and-authorization)
8. [Real-time Updates](#real-time-updates)
9. [Internationalization](#internationalization)
10. [Build System](#build-system)

## Overview

Taiga's front-end is built with AngularJS (1.5.x), CoffeeScript, and uses Jade templates and SCSS for styling. It follows a modular architecture where each feature is encapsulated in its own module. The application communicates with the Taiga back-end API to provide a rich user interface for managing projects, user stories, tasks, issues, and more.

The front-end is designed to be responsive, providing a good user experience on both desktop and mobile devices. It also supports real-time updates through WebSocket connections, allowing users to see changes made by other users without refreshing the page.

## Architectural Patterns

Taiga follows several architectural patterns:

### MVC (Model-View-Controller)

As an AngularJS application, Taiga follows the MVC pattern:

- **Models**: Represented by services that fetch and manipulate data from the API.
- **Views**: Implemented as Jade templates that define the UI.
- **Controllers**: AngularJS controllers that connect models and views, handling user interactions and updating the view when the model changes.

### Service-Oriented Architecture

Taiga uses services extensively to encapsulate business logic and data access. Services are singleton objects that can be injected into controllers and other services. This promotes code reuse and separation of concerns.

### Component-Based Architecture

Taiga uses directives (AngularJS's component system) to create reusable UI components. These components encapsulate both the UI and behavior, making it easier to maintain and extend the application.

### Pub/Sub Pattern

Taiga uses the publish/subscribe pattern for communication between components. Components can publish events to a central event bus, and other components can subscribe to these events. This decouples components and makes the application more maintainable.

## Module Structure

Taiga is organized into modules, each responsible for a specific feature or functionality. The main modules include:

### Core Modules

- **taigaBase**: Core functionality and navigation
- **taigaCommon**: Shared components and services
- **taigaResources**: API communication services
- **taigaAuth**: Authentication and authorization
- **taigaEvents**: Real-time event handling

### Feature Modules

- **taigaProjects**: Project management
- **taigaBacklog**: Backlog management
- **taigaTaskboard**: Sprint taskboard
- **taigaKanban**: Kanban board
- **taigaIssues**: Issue tracking
- **taigaUserStories**: User story management
- **taigaTasks**: Task management
- **taigaTeam**: Team management
- **taigaWiki**: Wiki functionality
- **taigaSearch**: Search functionality
- **taigaAdmin**: Administration features
- **taigaUserSettings**: User settings
- **taigaEpics**: Epic management

Each module typically includes:

- **Controllers**: Handle the application logic and bind data to views.
- **Directives**: Extend HTML with custom functionality.
- **Services**: Provide data and business logic.
- **Templates**: Define the UI.

## Data Flow

Data flows through the application in the following way:

1. **API Requests**: The ResourcesService makes HTTP requests to the Taiga API.
2. **Data Processing**: The data is processed by services and transformed into models.
3. **Controller Binding**: Controllers bind the models to the view.
4. **View Rendering**: The view is rendered with the bound data.
5. **User Interaction**: Users interact with the view, triggering events.
6. **Event Handling**: Controllers handle the events and update the models.
7. **Model Updates**: Updated models are sent back to the API.
8. **Real-time Updates**: WebSocket events notify the application of changes made by other users.

## Component Communication

Components in Taiga communicate in several ways:

### Parent-Child Communication

Parent components can pass data to child components through attributes. Child components can communicate with parent components through callbacks or by emitting events.

### Event Broadcasting

Components can broadcast events to the entire application or to specific scopes. Other components can listen for these events and react accordingly.

### Service Sharing

Components can share data and functionality through services. Services are singleton objects that can be injected into multiple components.

## State Management

Taiga manages state in several ways:

### Service State

Services maintain state that can be accessed by multiple components. For example, the ProjectService maintains the current project state.

### Scope State

Controllers maintain state in their scope, which is accessible to the view and child controllers.

### URL State

Some state is maintained in the URL, allowing users to bookmark and share specific views.

### Local Storage

Some state is persisted in the browser's local storage, such as authentication tokens and user preferences.

## Authentication and Authorization

Taiga uses token-based authentication:

1. Users log in with their username and password.
2. The server validates the credentials and returns an authentication token.
3. The token is stored in local storage and included in subsequent API requests.
4. The server validates the token and authorizes the request based on the user's permissions.

Permissions are defined at the project level and assigned to roles. Users are assigned roles within projects, determining what actions they can perform.

## Real-time Updates

Taiga uses WebSockets for real-time updates:

1. The EventsService establishes a WebSocket connection to the server.
2. Components subscribe to specific channels based on the resources they're interested in.
3. When a resource is updated, the server broadcasts an event to the appropriate channel.
4. The EventsService receives the event and notifies the subscribed components.
5. Components update their state and re-render the view.

## Internationalization

Taiga supports multiple languages through the angular-translate module:

1. Translation strings are defined in JSON files for each language.
2. The application loads the appropriate language file based on the user's preference.
3. Translation keys are used in templates and replaced with the translated strings at runtime.
4. Users can change their language preference in their user settings.

## Build System

Taiga uses Gulp as its build system:

1. CoffeeScript files are compiled to JavaScript.
2. Jade templates are compiled to HTML.
3. SCSS files are compiled to CSS.
4. JavaScript and CSS files are concatenated and minified.
5. Assets are copied to the distribution directory.
6. The application is served using a development server during development.
7. For production, the application is built and deployed to a web server.

The build system is configured in the gulpfile.js file and uses various Gulp plugins to perform the build tasks.
