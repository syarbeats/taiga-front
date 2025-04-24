# Entity Relationship Diagrams

This document contains entity relationship diagrams that illustrate the data models in the Taiga front-end application. Note that these diagrams represent the client-side data models, which may differ slightly from the server-side database schema.

## Table of Contents

1. [Project Model](#project-model)
2. [User Story Model](#user-story-model)
3. [Task Model](#task-model)
4. [Issue Model](#issue-model)
5. [User and Membership Model](#user-and-membership-model)

## Project Model

```mermaid
erDiagram
    PROJECT {
        int id
        string name
        string slug
        string description
        string logo_small_url
        string logo_big_url
        bool is_private
        bool is_featured
        bool is_backlog_activated
        bool is_kanban_activated
        bool is_wiki_activated
        bool is_issues_activated
        bool is_epics_activated
        array members
        array roles
        array us_statuses
        array task_statuses
        array issue_statuses
        array issue_types
        array priorities
        array severities
        array points
        array epic_statuses
        array tags_colors
        array anon_permissions
        array public_permissions
        array my_permissions
    }
    
    PROJECT ||--o{ MILESTONE : "has"
    PROJECT ||--o{ EPIC : "has"
    PROJECT ||--o{ USER_STORY : "has"
    PROJECT ||--o{ TASK : "has"
    PROJECT ||--o{ ISSUE : "has"
    PROJECT ||--o{ WIKI_PAGE : "has"
    PROJECT ||--o{ MEMBERSHIP : "has"
    PROJECT ||--o{ ROLE : "has"
```

The Project model is the central entity in Taiga. It contains all the information about a project, including its name, description, and various settings. It also contains references to all the other entities in the system, such as milestones, epics, user stories, tasks, issues, wiki pages, memberships, and roles.

## User Story Model

```mermaid
erDiagram
    USER_STORY {
        int id
        int ref
        string subject
        string description
        int status
        int project
        int milestone
        int owner
        int assigned_to
        array points
        array attachments
        array tags
        bool is_closed
        bool is_blocked
        string blocked_note
        int order
        int backlog_order
        int sprint_order
        int kanban_order
        bool client_requirement
        bool team_requirement
        int total_points
        array custom_attributes_values
        array generated_user_stories
        array watchers
        int total_watchers
        array related_tasks
    }
    
    USER_STORY ||--o{ TASK : "has"
    USER_STORY }o--|| PROJECT : "belongs to"
    USER_STORY }o--o| MILESTONE : "belongs to"
    USER_STORY }o--o| USER : "assigned to"
    USER_STORY }o--o| USER : "owned by"
    USER_STORY }o--o{ EPIC : "related to"
```

The User Story model represents a user story in Taiga. It contains information such as the subject, description, status, and points. It also contains references to related entities such as the project, milestone, owner, assigned user, and related tasks.

## Task Model

```mermaid
erDiagram
    TASK {
        int id
        int ref
        string subject
        string description
        int status
        int project
        int user_story
        int milestone
        int owner
        int assigned_to
        array attachments
        array tags
        bool is_closed
        bool is_blocked
        string blocked_note
        int us_order
        int taskboard_order
        array custom_attributes_values
        array watchers
        int total_watchers
    }
    
    TASK }o--|| PROJECT : "belongs to"
    TASK }o--o| USER_STORY : "belongs to"
    TASK }o--o| MILESTONE : "belongs to"
    TASK }o--o| USER : "assigned to"
    TASK }o--o| USER : "owned by"
```

The Task model represents a task in Taiga. It contains information such as the subject, description, status, and order. It also contains references to related entities such as the project, user story, milestone, owner, and assigned user.

## Issue Model

```mermaid
erDiagram
    ISSUE {
        int id
        int ref
        string subject
        string description
        int status
        int type
        int priority
        int severity
        int project
        int milestone
        int owner
        int assigned_to
        array attachments
        array tags
        bool is_closed
        bool is_blocked
        string blocked_note
        array custom_attributes_values
        array watchers
        int total_watchers
        string due_date
        string due_date_reason
    }
    
    ISSUE }o--|| PROJECT : "belongs to"
    ISSUE }o--o| MILESTONE : "belongs to"
    ISSUE }o--o| USER : "assigned to"
    ISSUE }o--o| USER : "owned by"
```

The Issue model represents an issue in Taiga. It contains information such as the subject, description, status, type, priority, and severity. It also contains references to related entities such as the project, milestone, owner, and assigned user.

## User and Membership Model

```mermaid
erDiagram
    USER {
        int id
        string username
        string full_name
        string email
        string bio
        string photo
        string color
        bool is_active
        array roles
    }
    
    MEMBERSHIP {
        int id
        int user
        int project
        int role
        bool is_admin
        bool is_owner
        bool is_active
        string email
        string created_at
        string invitation_extra_text
        string user_order
    }
    
    ROLE {
        int id
        string name
        string slug
        array permissions
        int order
        bool computable
    }
    
    USER ||--o{ MEMBERSHIP : "has"
    MEMBERSHIP }o--|| PROJECT : "belongs to"
    MEMBERSHIP }o--|| ROLE : "has"
```

The User model represents a user in Taiga. It contains information such as the username, full name, email, and roles. The Membership model represents a user's membership in a project. It contains information such as the user, project, role, and whether the user is an admin or owner of the project. The Role model represents a role in Taiga, which defines a set of permissions.
