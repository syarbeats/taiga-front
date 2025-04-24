# Taiga Front-end Documentation

This documentation provides a comprehensive overview of the Taiga front-end application architecture, components, and workflows. It is intended for developers who need to understand how the code works and how to extend or modify it.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Diagrams](#diagrams)
   - [Activity Diagrams](diagrams/activity-diagrams.md)
   - [Sequence Diagrams](diagrams/sequence-diagrams.md)
   - [ER Diagrams](diagrams/er-diagrams.md)
   - [Class Diagrams](diagrams/class-diagrams.md)
4. [Key Components](#key-components)
5. [Development Guide](#development-guide)

## Project Overview

Taiga is an open-source project management platform for agile developers, designers, and project managers. The front-end application is built with AngularJS (1.5.x), CoffeeScript, and uses Jade templates and SCSS for styling. It communicates with the Taiga back-end API to provide a rich user interface for managing projects, user stories, tasks, issues, and more.

## Architecture

The Taiga front-end follows a modular architecture based on AngularJS. The application is organized into modules, each responsible for a specific feature or functionality. The main modules include:

- **taigaBase**: Core functionality and navigation
- **taigaCommon**: Shared components and services
- **taigaResources**: API communication services
- **taigaAuth**: Authentication and authorization
- **taigaEvents**: Real-time event handling
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

The application uses a service-based architecture where data is fetched from the backend API using resource services and then processed and displayed by controllers and directives.

## Key Components

### Services

Services in Taiga are responsible for data fetching, processing, and business logic. Key services include:

- **ProjectService**: Manages project data and state
- **ResourcesService**: Communicates with the backend API
- **AuthService**: Handles authentication and authorization
- **EventsService**: Manages real-time events

### Controllers

Controllers handle the application logic and bind data to views. They follow a hierarchical structure where parent controllers provide context for child controllers.

### Directives

Directives extend HTML with custom functionality. Taiga uses directives extensively for reusable UI components like status buttons, user cards, and more.

### Models

Models represent data structures in the application. Taiga uses Immutable.js for some of its models to ensure data integrity.

## Development Guide

For detailed information on developing with the Taiga front-end, please refer to the following resources:

- [Project Setup](https://github.com/taigaio/taiga-front#installation)
- [Contributing Guidelines](https://github.com/taigaio/taiga-front/blob/master/CONTRIBUTING.md)
- [Taiga Documentation](https://docs.taiga.io/)

For more detailed technical documentation, please refer to the diagrams and specific component documentation in this repository.
