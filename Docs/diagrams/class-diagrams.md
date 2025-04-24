# Class Diagrams

This document contains class diagrams that illustrate the class structure in the Taiga front-end application. Note that since Taiga is built with AngularJS and CoffeeScript, these diagrams represent the conceptual class structure rather than actual class definitions.

## Table of Contents

1. [Core Services](#core-services)
2. [Project Module](#project-module)
3. [User Story Module](#user-story-module)
4. [Task Module](#task-module)
5. [Controller Hierarchy](#controller-hierarchy)

## Core Services

```mermaid
classDiagram
    class ResourcesService {
        +urls: Object
        +get(id): Promise
        +list(filters): Promise
        +create(data): Promise
        +update(id, data): Promise
        +delete(id): Promise
        +queryOne(name, id): Promise
        +queryMany(name, params): Promise
        +queryOneRaw(name, id): Promise
    }
    
    class AuthService {
        +userData: Object
        +login(username, password): Promise
        +logout(): void
        +refresh(): Promise
        +getUser(): Object
        +isAuthenticated(): boolean
        +setToken(token): void
        +getToken(): string
        +removeToken(): void
    }
    
    class EventsService {
        +sessionId: string
        +connected: boolean
        +setupConnection(): void
        +subscribe(scope, channel, callback): void
        +unsubscribe(scope, channel, callback): void
        +publish(channel, data): void
    }
    
    class ProjectService {
        +project: Object
        +section: string
        +sectionsBreadcrumb: Array
        +activeMembers: Array
        +setProject(project): void
        +setProjectBySlug(slug): Promise
        +fetchProject(): Promise
        +hasPermission(permission): boolean
        +cleanProject(): void
    }
    
    ResourcesService <|-- ProjectsResourcesProvider
    ResourcesService <|-- UserstoriesResourcesProvider
    ResourcesService <|-- TasksResourcesProvider
    ResourcesService <|-- IssuesResourcesProvider
    
    ProjectService --> ResourcesService
    AuthService --> ResourcesService
    EventsService --> ResourcesService
```

The core services in Taiga include ResourcesService, which handles API communication, AuthService, which manages authentication, EventsService, which handles real-time events, and ProjectService, which manages project data. ResourcesService is extended by various resource providers for specific entity types.

## Project Module

```mermaid
classDiagram
    class ProjectsService {
        +create(data): Promise
        +duplicate(projectId, data): Promise
        +getProjectBySlug(projectSlug): Promise
        +getProjectStats(projectId): Promise
        +getProjectsByUserId(userId, paginate): Promise
        +getListProjectsByUserId(userId, paginate): Promise
        +bulkUpdateProjectsOrder(sortData): Promise
        +transferValidateToken(projectId, token): Promise
        +transferAccept(projectId, token, reason): Promise
        +transferReject(projectId, token, reason): Promise
    }
    
    class ProjectController {
        +user: Object
        +project: Object
        +members: Array
        +isAuthenticated: boolean
        +registerUrl: string
        +loginUrl: string
        +publicRegisterEnabled: boolean
    }
    
    class ProjectRouterController {
        +navigate(): void
    }
    
    ProjectController --> ProjectsService
    ProjectRouterController --> ProjectController
```

The Project module includes ProjectsService, which provides methods for project operations, ProjectController, which manages project data for the view, and ProjectRouterController, which handles project navigation.

## User Story Module

```mermaid
classDiagram
    class UserStoryDetailController {
        +us: Object
        +usId: number
        +project: Object
        +sprint: Object
        +tasks: Array
        +loadInitialData(): Promise
        +loadUs(): Promise
        +loadSprint(): Promise
        +loadTasks(): Promise
        +onUpvote(): Promise
        +onDownvote(): Promise
        +onWatch(): Promise
        +onUnwatch(): Promise
        +reorderTask(task, newIndex): Promise
    }
    
    class UsStatusDisplayDirective {
        +link(scope, el, attrs): void
    }
    
    class UsStatusButtonDirective {
        +link(scope, el, attrs, model): void
    }
    
    class UsTeamRequirementButtonDirective {
        +link(scope, el, attrs, model): void
    }
    
    class UsClientRequirementButtonDirective {
        +link(scope, el, attrs, model): void
    }
    
    UserStoryDetailController --> ResourcesService
    UserStoryDetailController --> ProjectService
    UsStatusDisplayDirective --> UserStoryDetailController
    UsStatusButtonDirective --> UserStoryDetailController
    UsTeamRequirementButtonDirective --> UserStoryDetailController
    UsClientRequirementButtonDirective --> UserStoryDetailController
```

The User Story module includes UserStoryDetailController, which manages user story data for the view, and various directives for displaying and updating user story properties.

## Task Module

```mermaid
classDiagram
    class TaskDetailController {
        +task: Object
        +taskId: number
        +project: Object
        +us: Object
        +loadInitialData(): Promise
        +loadTask(): Promise
        +loadUs(): Promise
        +onUpvote(): Promise
        +onDownvote(): Promise
        +onWatch(): Promise
        +onUnwatch(): Promise
    }
    
    class TaskStatusDisplayDirective {
        +link(scope, el, attrs): void
    }
    
    class TaskStatusButtonDirective {
        +link(scope, el, attrs, model): void
    }
    
    TaskDetailController --> ResourcesService
    TaskDetailController --> ProjectService
    TaskStatusDisplayDirective --> TaskDetailController
    TaskStatusButtonDirective --> TaskDetailController
```

The Task module includes TaskDetailController, which manages task data for the view, and directives for displaying and updating task properties.

## Controller Hierarchy

```mermaid
classDiagram
    class Controller {
        +scope: Object
        +initialize(): void
    }
    
    class PageMixin {
        +loadInitialData(): Promise
        +onInitialDataError(): void
        +fillUsersAndRoles(users, roles): void
    }
    
    class DetailController {
        +loadAttachments(): void
        +initializeEventHandlers(): void
    }
    
    class UserStoryDetailController {
        +us: Object
        +usId: number
        +project: Object
        +sprint: Object
        +tasks: Array
        +loadInitialData(): Promise
        +loadUs(): Promise
        +loadSprint(): Promise
        +loadTasks(): Promise
    }
    
    class TaskDetailController {
        +task: Object
        +taskId: number
        +project: Object
        +us: Object
        +loadInitialData(): Promise
        +loadTask(): Promise
        +loadUs(): Promise
    }
    
    class IssueDetailController {
        +issue: Object
        +issueId: number
        +project: Object
        +loadInitialData(): Promise
        +loadIssue(): Promise
    }
    
    Controller <|-- PageMixin
    PageMixin <|-- DetailController
    DetailController <|-- UserStoryDetailController
    DetailController <|-- TaskDetailController
    DetailController <|-- IssueDetailController
```

The controller hierarchy in Taiga includes a base Controller class, a PageMixin that adds common page functionality, a DetailController that adds common detail functionality, and specific controllers for different entity types.
