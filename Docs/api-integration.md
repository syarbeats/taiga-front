# Taiga API Integration

This document explains how the Taiga front-end integrates with the Taiga back-end API, including the API structure, authentication, and data handling.

## Table of Contents

1. [API Overview](#api-overview)
2. [Authentication](#authentication)
3. [Resource Services](#resource-services)
4. [API Endpoints](#api-endpoints)
5. [Error Handling](#error-handling)
6. [Real-time Updates](#real-time-updates)
7. [Pagination and Filtering](#pagination-and-filtering)
8. [File Uploads](#file-uploads)
9. [Best Practices](#best-practices)

## API Overview

The Taiga front-end communicates with the Taiga back-end API, which is a RESTful API built with Django and Django REST Framework. The API provides endpoints for all the resources in the system, such as projects, user stories, tasks, issues, and users.

The API follows RESTful principles:

- Resources are identified by URLs
- HTTP methods (GET, POST, PUT, PATCH, DELETE) are used to perform operations on resources
- JSON is used for data exchange
- HTTP status codes are used to indicate the result of operations

## Authentication

Taiga uses token-based authentication for API requests. The authentication flow is as follows:

1. The user provides their username and password to the front-end.
2. The front-end sends a POST request to the `/auth` endpoint with the credentials.
3. If the credentials are valid, the API returns an authentication token.
4. The front-end stores the token in local storage.
5. For subsequent API requests, the front-end includes the token in the `Authorization` header as a Bearer token.

```javascript
// Example of authentication request
$http.post('/auth', {
    username: 'user',
    password: 'password'
}).then(function(response) {
    localStorage.setItem('token', response.data.auth_token);
});

// Example of authenticated request
$http.get('/api/v1/projects', {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
});
```

The token has an expiration time, after which the user needs to re-authenticate. The API also provides a `/auth/refresh` endpoint to refresh the token without requiring the user to re-enter their credentials.

## Resource Services

The Taiga front-end uses resource services to communicate with the API. These services are built on top of the `$http` service provided by AngularJS and provide methods for common operations on resources.

The main resource service is `ResourcesService`, which is extended by various resource providers for specific entity types:

- `ProjectsResourcesProvider`: For project operations
- `UserstoriesResourcesProvider`: For user story operations
- `TasksResourcesProvider`: For task operations
- `IssuesResourcesProvider`: For issue operations
- And many more...

Each resource provider adds methods to the `ResourcesService` for operations specific to its entity type. For example, the `ProjectsResourcesProvider` adds methods for creating, retrieving, updating, and deleting projects.

```javascript
// Example of resource service usage
resourcesService.projects.get(projectId).then(function(project) {
    // Handle project data
});

resourcesService.userstories.create(usData).then(function(us) {
    // Handle created user story
});
```

## API Endpoints

The Taiga API provides endpoints for all the resources in the system. The main endpoints include:

### Authentication

- `POST /auth`: Authenticate user and get token
- `POST /auth/refresh`: Refresh authentication token

### Projects

- `GET /projects`: List projects
- `POST /projects`: Create a new project
- `GET /projects/{id}`: Get project details
- `PUT /projects/{id}`: Update project
- `DELETE /projects/{id}`: Delete project
- `GET /projects/by_slug?slug={slug}`: Get project by slug

### User Stories

- `GET /userstories`: List user stories
- `POST /userstories`: Create a new user story
- `GET /userstories/{id}`: Get user story details
- `PUT /userstories/{id}`: Update user story
- `DELETE /userstories/{id}`: Delete user story
- `POST /userstories/bulk_create`: Create multiple user stories
- `POST /userstories/bulk_update_milestone`: Move multiple user stories to a milestone

### Tasks

- `GET /tasks`: List tasks
- `POST /tasks`: Create a new task
- `GET /tasks/{id}`: Get task details
- `PUT /tasks/{id}`: Update task
- `DELETE /tasks/{id}`: Delete task
- `POST /tasks/bulk_create`: Create multiple tasks

### Issues

- `GET /issues`: List issues
- `POST /issues`: Create a new issue
- `GET /issues/{id}`: Get issue details
- `PUT /issues/{id}`: Update issue
- `DELETE /issues/{id}`: Delete issue
- `POST /issues/bulk_create`: Create multiple issues

### Users

- `GET /users`: List users
- `GET /users/{id}`: Get user details
- `GET /users/me`: Get current user details
- `PUT /users/me`: Update current user

## Error Handling

The Taiga front-end handles API errors in several ways:

### HTTP Interceptors

AngularJS HTTP interceptors are used to handle common error scenarios:

- `authHttpIntercept`: Handles authentication errors (401) by redirecting to the login page
- `loaderIntercept`: Shows and hides the loader during API requests
- `versionCheckHttpIntercept`: Handles version conflicts (400 with version error)
- `blockingIntercept`: Handles blocked elements (451)

### Error Handling Service

The `ErrorHandlingService` provides methods for handling specific error scenarios:

- `error()`: Handles general errors
- `notFound()`: Handles 404 errors
- `permissionDenied()`: Handles 403 errors
- `block()`: Handles blocked elements

### Controller Error Handling

Controllers handle specific error scenarios for their operations. For example, the `UserStoryDetailController` handles errors when loading a user story:

```javascript
promise.then(null, this.onInitialDataError.bind(this));

onInitialDataError: function(response) {
    if (response.status === 404) {
        this.errorHandlingService.notFound();
    } else {
        this.errorHandlingService.error();
    }
}
```

## Real-time Updates

The Taiga front-end uses WebSockets for real-time updates. The `EventsService` establishes a WebSocket connection to the server and provides methods for subscribing to events:

```javascript
eventsService.subscribe(scope, "issues", function(message) {
    // Handle issue update event
});
```

When a resource is updated, the server broadcasts an event to the appropriate channel. The `EventsService` receives the event and notifies the subscribed components, which can then update their state and re-render the view.

## Pagination and Filtering

The Taiga API supports pagination and filtering for list endpoints. The front-end can specify pagination parameters and filters in the request:

```javascript
resourcesService.issues.list({
    page: 1,
    page_size: 20,
    status: 1,
    assigned_to: 123
}).then(function(issues) {
    // Handle paginated and filtered issues
});
```

The API response includes pagination metadata, such as the total number of items and the number of pages.

## File Uploads

The Taiga front-end supports file uploads for attachments and other resources. File uploads are handled using the `FormData` API:

```javascript
var formData = new FormData();
formData.append('file', file);

$http.post('/api/v1/attachments', formData, {
    transformRequest: angular.identity,
    headers: {'Content-Type': undefined}
}).then(function(response) {
    // Handle uploaded file
});
```

## Best Practices

When integrating with the Taiga API, follow these best practices:

1. **Use Resource Services**: Use the provided resource services instead of making direct HTTP requests.
2. **Handle Errors**: Always handle errors from API requests and provide appropriate feedback to the user.
3. **Use Pagination**: Use pagination for list endpoints to improve performance.
4. **Cache Data**: Cache frequently accessed data to reduce the number of API requests.
5. **Use Real-time Updates**: Use WebSocket events to keep the UI in sync with the server.
6. **Validate Input**: Validate user input before sending it to the API to prevent errors.
7. **Follow RESTful Principles**: Use the appropriate HTTP methods for different operations.
8. **Use Proper Authentication**: Always include the authentication token in API requests.
9. **Handle Token Expiration**: Refresh the token when it expires to maintain the user session.
10. **Test API Integration**: Test the API integration thoroughly to ensure it works as expected.
