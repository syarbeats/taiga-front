# Sequence Diagrams

This document contains sequence diagrams that illustrate the interactions between components in the Taiga front-end application.

## Table of Contents

1. [User Authentication Sequence](#user-authentication-sequence)
2. [Project Loading Sequence](#project-loading-sequence)
3. [User Story Creation Sequence](#user-story-creation-sequence)
4. [Task Status Update Sequence](#task-status-update-sequence)
5. [Real-time Updates Sequence](#real-time-updates-sequence)

## User Authentication Sequence

```mermaid
sequenceDiagram
    participant User
    participant AuthController
    participant AuthService
    participant ResourcesService
    participant API
    participant LocalStorage
    
    User->>AuthController: Enter credentials
    AuthController->>AuthService: login(username, password)
    AuthService->>ResourcesService: auth.login(username, password)
    ResourcesService->>API: POST /auth
    API-->>ResourcesService: Return auth token
    ResourcesService-->>AuthService: Return auth data
    AuthService->>LocalStorage: Store token
    AuthService->>ResourcesService: users.getMe()
    ResourcesService->>API: GET /users/me
    API-->>ResourcesService: Return user data
    ResourcesService-->>AuthService: Return user data
    AuthService->>LocalStorage: Store user info
    AuthService-->>AuthController: Authentication successful
    AuthController-->>User: Redirect to dashboard
```

This sequence diagram illustrates the authentication process in Taiga. When a user enters their credentials, the AuthController passes them to the AuthService, which uses the ResourcesService to make an API call. Upon successful authentication, the API returns an auth token, which is stored in LocalStorage. The AuthService then fetches the user data and stores it in LocalStorage as well. Finally, the user is redirected to the dashboard.

## Project Loading Sequence

```mermaid
sequenceDiagram
    participant User
    participant Router
    participant ProjectController
    participant ProjectService
    participant ResourcesService
    participant API
    
    User->>Router: Navigate to project URL
    Router->>ProjectController: Initialize
    ProjectController->>ProjectService: setProjectBySlug(slug)
    ProjectService->>ResourcesService: projects.getProjectBySlug(slug)
    ResourcesService->>API: GET /projects/by_slug?slug={slug}
    API-->>ResourcesService: Return project data
    ResourcesService-->>ProjectService: Return project data
    ProjectService->>ProjectService: setProject(project)
    ProjectService-->>ProjectController: Project loaded
    ProjectController->>ProjectController: loadInitialData()
    ProjectController->>ResourcesService: Load related data (members, roles, etc.)
    ResourcesService->>API: Multiple API calls
    API-->>ResourcesService: Return related data
    ResourcesService-->>ProjectController: Return related data
    ProjectController-->>User: Display project dashboard
```

This sequence diagram shows how a project is loaded when a user navigates to a project URL. The Router initializes the ProjectController, which uses the ProjectService to fetch the project data by slug. The ProjectService makes an API call through the ResourcesService, and upon receiving the project data, sets it in the ProjectService. The ProjectController then loads related data such as members and roles, and finally displays the project dashboard to the user.

## User Story Creation Sequence

```mermaid
sequenceDiagram
    participant User
    participant BacklogController
    participant LightboxService
    participant UsFormController
    participant ResourcesService
    participant API
    
    User->>BacklogController: Click "Add User Story"
    BacklogController->>LightboxService: Open user story form
    LightboxService->>UsFormController: Initialize form
    User->>UsFormController: Fill form and submit
    UsFormController->>ResourcesService: userstories.create(data)
    ResourcesService->>API: POST /userstories
    API-->>ResourcesService: Return created user story
    ResourcesService-->>UsFormController: Return created user story
    UsFormController->>LightboxService: Close form
    LightboxService-->>BacklogController: Notify creation
    BacklogController->>ResourcesService: Refresh backlog
    ResourcesService->>API: GET /userstories
    API-->>ResourcesService: Return updated user stories
    ResourcesService-->>BacklogController: Return updated user stories
    BacklogController-->>User: Display updated backlog
```

This sequence diagram illustrates the process of creating a user story. When a user clicks "Add User Story" in the BacklogController, a form is opened using the LightboxService. The user fills out the form and submits it, which triggers the UsFormController to create the user story through the ResourcesService. After the API returns the created user story, the form is closed, and the BacklogController refreshes the backlog to display the updated list of user stories.

## Task Status Update Sequence

```mermaid
sequenceDiagram
    participant User
    participant TaskboardController
    participant TaskStatusButtonDirective
    participant ModelTransform
    participant ResourcesService
    participant API
    participant EventsService
    
    User->>TaskStatusButtonDirective: Click status button
    TaskStatusButtonDirective->>TaskStatusButtonDirective: Show status options
    User->>TaskStatusButtonDirective: Select new status
    TaskStatusButtonDirective->>ModelTransform: save(task)
    ModelTransform->>ResourcesService: tasks.patch(task)
    ResourcesService->>API: PATCH /tasks/{id}
    API-->>ResourcesService: Return updated task
    ResourcesService-->>ModelTransform: Return updated task
    ModelTransform-->>TaskStatusButtonDirective: Update successful
    TaskStatusButtonDirective->>EventsService: Broadcast "object:updated"
    EventsService->>TaskboardController: Handle "object:updated"
    TaskboardController->>ResourcesService: Refresh taskboard
    ResourcesService->>API: GET /tasks
    API-->>ResourcesService: Return updated tasks
    ResourcesService-->>TaskboardController: Return updated tasks
    TaskboardController-->>User: Display updated taskboard
```

This sequence diagram shows the process of updating a task's status. When a user clicks a status button in the TaskStatusButtonDirective, they are shown status options. After selecting a new status, the ModelTransform service is used to save the task through the ResourcesService. Upon successful update, an "object:updated" event is broadcast through the EventsService, which triggers the TaskboardController to refresh the taskboard and display the updated tasks.

## Real-time Updates Sequence

```mermaid
sequenceDiagram
    participant User1
    participant User2
    participant EventsService
    participant WebSocket
    participant API
    participant Controller
    
    User1->>API: Update resource
    API-->>User1: Return updated resource
    API->>WebSocket: Broadcast update event
    WebSocket->>EventsService: Receive update event
    EventsService->>Controller: Notify update
    Controller->>Controller: Handle update
    Controller-->>User2: Display update notification
    User2->>Controller: View updated resource
    Controller->>ResourcesService: Fetch updated resource
    ResourcesService->>API: GET resource
    API-->>ResourcesService: Return updated resource
    ResourcesService-->>Controller: Return updated resource
    Controller-->>User2: Display updated resource
```

This sequence diagram illustrates how real-time updates work in Taiga. When User1 updates a resource through the API, the API broadcasts an update event through WebSocket. The EventsService receives this event and notifies the appropriate Controller, which handles the update and displays a notification to User2. When User2 views the updated resource, the Controller fetches the latest version from the API and displays it.
