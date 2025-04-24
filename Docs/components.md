# Taiga Components

This document provides an overview of the key components in the Taiga front-end application, including their purpose, structure, and interactions.

## Table of Contents

1. [Component Overview](#component-overview)
2. [Core Components](#core-components)
3. [Project Components](#project-components)
4. [User Story Components](#user-story-components)
5. [Task Components](#task-components)
6. [Issue Components](#issue-components)
7. [Wiki Components](#wiki-components)
8. [Admin Components](#admin-components)
9. [Shared Components](#shared-components)
10. [Component Communication](#component-communication)

## Component Overview

In Taiga, components are implemented using AngularJS directives. These directives extend HTML with custom functionality and encapsulate both the UI and behavior. Components can be reused across the application, promoting code reuse and maintainability.

Components in Taiga follow these principles:

- **Single Responsibility**: Each component has a single responsibility.
- **Encapsulation**: Components encapsulate their internal state and behavior.
- **Reusability**: Components are designed to be reused across the application.
- **Composability**: Components can be composed to create more complex components.

## Core Components

### Navigation Bar

The navigation bar component (`tg-nav-bar`) provides the main navigation for the application. It includes links to the dashboard, projects, and user settings.

```html
<tg-nav-bar></tg-nav-bar>
```

### Sidebar

The sidebar component (`tg-sidebar`) provides navigation within a project. It includes links to the backlog, kanban board, issues, wiki, and team.

```html
<tg-sidebar></tg-sidebar>
```

### Loader

The loader component (`tg-loader`) displays a loading indicator when the application is fetching data.

```html
<tg-loader></tg-loader>
```

### Notifications

The notifications component (`tg-notifications`) displays notifications to the user, such as success messages, error messages, and warnings.

```html
<tg-notifications></tg-notifications>
```

## Project Components

### Project List

The project list component (`tg-projects-list`) displays a list of projects that the user has access to.

```html
<tg-projects-list></tg-projects-list>
```

### Project Card

The project card component (`tg-project-card`) displays a card with project information, including the project name, description, and statistics.

```html
<tg-project-card ng-model="project"></tg-project-card>
```

### Project Menu

The project menu component (`tg-project-menu`) provides navigation within a project, including links to the backlog, kanban board, issues, wiki, and team.

```html
<tg-project-menu></tg-project-menu>
```

### Project Settings

The project settings component (`tg-project-settings`) provides a form for editing project settings, such as the project name, description, and privacy settings.

```html
<tg-project-settings ng-model="project"></tg-project-settings>
```

## User Story Components

### User Story List

The user story list component (`tg-us-list`) displays a list of user stories, typically in the backlog or sprint.

```html
<tg-us-list ng-model="userStories"></tg-us-list>
```

### User Story Card

The user story card component (`tg-us-card`) displays a card with user story information, including the subject, description, and status.

```html
<tg-us-card ng-model="userStory"></tg-us-card>
```

### User Story Form

The user story form component (`tg-us-form`) provides a form for creating or editing a user story.

```html
<tg-us-form ng-model="userStory"></tg-us-form>
```

### User Story Status

The user story status component (`tg-us-status`) displays the status of a user story and allows the user to change it.

```html
<tg-us-status ng-model="userStory"></tg-us-status>
```

### User Story Points

The user story points component (`tg-us-points`) displays the points assigned to a user story and allows the user to change them.

```html
<tg-us-points ng-model="userStory"></tg-us-points>
```

## Task Components

### Task List

The task list component (`tg-task-list`) displays a list of tasks, typically associated with a user story.

```html
<tg-task-list ng-model="tasks"></tg-task-list>
```

### Task Card

The task card component (`tg-task-card`) displays a card with task information, including the subject, description, and status.

```html
<tg-task-card ng-model="task"></tg-task-card>
```

### Task Form

The task form component (`tg-task-form`) provides a form for creating or editing a task.

```html
<tg-task-form ng-model="task"></tg-task-form>
```

### Task Status

The task status component (`tg-task-status`) displays the status of a task and allows the user to change it.

```html
<tg-task-status ng-model="task"></tg-task-status>
```

## Issue Components

### Issue List

The issue list component (`tg-issue-list`) displays a list of issues.

```html
<tg-issue-list ng-model="issues"></tg-issue-list>
```

### Issue Card

The issue card component (`tg-issue-card`) displays a card with issue information, including the subject, description, and status.

```html
<tg-issue-card ng-model="issue"></tg-issue-card>
```

### Issue Form

The issue form component (`tg-issue-form`) provides a form for creating or editing an issue.

```html
<tg-issue-form ng-model="issue"></tg-issue-form>
```

### Issue Status

The issue status component (`tg-issue-status`) displays the status of an issue and allows the user to change it.

```html
<tg-issue-status ng-model="issue"></tg-issue-status>
```

### Issue Type

The issue type component (`tg-issue-type`) displays the type of an issue and allows the user to change it.

```html
<tg-issue-type ng-model="issue"></tg-issue-type>
```

### Issue Priority

The issue priority component (`tg-issue-priority`) displays the priority of an issue and allows the user to change it.

```html
<tg-issue-priority ng-model="issue"></tg-issue-priority>
```

### Issue Severity

The issue severity component (`tg-issue-severity`) displays the severity of an issue and allows the user to change it.

```html
<tg-issue-severity ng-model="issue"></tg-issue-severity>
```

## Wiki Components

### Wiki Page

The wiki page component (`tg-wiki-page`) displays a wiki page, including its content and metadata.

```html
<tg-wiki-page ng-model="wikiPage"></tg-wiki-page>
```

### Wiki Form

The wiki form component (`tg-wiki-form`) provides a form for creating or editing a wiki page.

```html
<tg-wiki-form ng-model="wikiPage"></tg-wiki-form>
```

### Wiki Links

The wiki links component (`tg-wiki-links`) displays a list of links to other wiki pages.

```html
<tg-wiki-links></tg-wiki-links>
```

## Admin Components

### Admin Navigation

The admin navigation component (`tg-admin-nav`) provides navigation within the admin section of a project.

```html
<tg-admin-nav></tg-admin-nav>
```

### Admin Project Profile

The admin project profile component (`tg-admin-project-profile`) provides a form for editing the project profile.

```html
<tg-admin-project-profile ng-model="project"></tg-admin-project-profile>
```

### Admin Project Values

The admin project values component (`tg-admin-project-values`) provides forms for editing project values, such as statuses, points, priorities, and severities.

```html
<tg-admin-project-values ng-model="project"></tg-admin-project-values>
```

### Admin Memberships

The admin memberships component (`tg-admin-memberships`) provides a form for managing project memberships.

```html
<tg-admin-memberships ng-model="project"></tg-admin-memberships>
```

### Admin Roles

The admin roles component (`tg-admin-roles`) provides a form for managing project roles and permissions.

```html
<tg-admin-roles ng-model="project"></tg-admin-roles>
```

## Shared Components

### User Avatar

The user avatar component (`tg-user-avatar`) displays a user's avatar.

```html
<tg-user-avatar ng-model="user"></tg-user-avatar>
```

### User Card

The user card component (`tg-user-card`) displays a card with user information, including the username, full name, and avatar.

```html
<tg-user-card ng-model="user"></tg-user-card>
```

### Date Picker

The date picker component (`tg-date-picker`) provides a date picker for selecting dates.

```html
<tg-date-picker ng-model="date"></tg-date-picker>
```

### Tags Input

The tags input component (`tg-tags-input`) provides an input for entering tags.

```html
<tg-tags-input ng-model="tags"></tg-tags-input>
```

### Comments

The comments component (`tg-comments`) displays a list of comments and provides a form for adding new comments.

```html
<tg-comments ng-model="comments"></tg-comments>
```

### Attachments

The attachments component (`tg-attachments`) displays a list of attachments and provides a form for uploading new attachments.

```html
<tg-attachments ng-model="attachments"></tg-attachments>
```

### Wysiwyg Editor

The wysiwyg editor component (`tg-wysiwyg`) provides a rich text editor for editing content.

```html
<tg-wysiwyg ng-model="content"></tg-wysiwyg>
```

### Lightbox

The lightbox component (`tg-lightbox`) displays content in a modal dialog.

```html
<tg-lightbox>
    <div class="lightbox-content">
        <!-- Content goes here -->
    </div>
</tg-lightbox>
```

## Component Communication

Components in Taiga communicate in several ways:

### Parent-Child Communication

Parent components can pass data to child components through attributes. Child components can communicate with parent components through callbacks or by emitting events.

```html
<tg-parent>
    <tg-child data="parentData" on-change="parentCallback(data)"></tg-child>
</tg-parent>
```

### Event Broadcasting

Components can broadcast events to the entire application or to specific scopes. Other components can listen for these events and react accordingly.

```javascript
// Broadcasting an event
$rootScope.$broadcast("user:updated", user);

// Listening for an event
$scope.$on("user:updated", function(event, user) {
    // Handle the event
});
```

### Service Sharing

Components can share data and functionality through services. Services are singleton objects that can be injected into multiple components.

```javascript
// Service
angular.module("taigaCommon").service("UserService", function() {
    var currentUser = null;
    
    return {
        setCurrentUser: function(user) {
            currentUser = user;
        },
        getCurrentUser: function() {
            return currentUser;
        }
    };
});

// Component using the service
angular.module("taigaCommon").controller("UserController", function(UserService) {
    this.user = UserService.getCurrentUser();
});
```

By understanding these components and how they communicate, developers can effectively work with the Taiga front-end codebase and extend it with new features.
