# Taiga Frontend Docker Setup

This document provides instructions for running the Taiga frontend using Docker Compose.

## Prerequisites

- Docker
- Docker Compose

## Quick Start

1. Clone this repository:
   ```
   git clone https://github.com/taigaio/taiga-front.git
   cd taiga-front
   ```

2. Start the Taiga frontend:
   ```
   docker-compose up -d
   ```

3. Access Taiga in your browser at: http://localhost

## Configuration

The Docker Compose setup uses environment variables to configure the Taiga frontend. You can modify these in the `docker-compose.yml` file or create a `.env` file in the same directory.

### Main Configuration Options

- `TAIGA_URL`: The URL of your Taiga backend API (e.g., http://taiga-back:8000)
- `TAIGA_WEBSOCKETS_URL`: The WebSockets URL for real-time updates (e.g., ws://taiga-events:8888)
- `TAIGA_SUBPATH`: If you're hosting Taiga under a subpath, specify it here (e.g., /taiga)
- `DEBUG`: Set to "true" to enable debug mode
- `DEFAULT_LANGUAGE`: Default language for the UI (e.g., en, es, fr)

### Authentication Settings

- `PUBLIC_REGISTER_ENABLED`: Set to "true" to allow public registration
- `ENABLE_GITHUB_AUTH`: Set to "true" to enable GitHub authentication
- `GITHUB_CLIENT_ID`: Your GitHub OAuth client ID
- `ENABLE_GITLAB_AUTH`: Set to "true" to enable GitLab authentication
- `GITLAB_CLIENT_ID`: Your GitLab OAuth client ID
- `GITLAB_URL`: Your GitLab instance URL

### Plugins and Importers

- `ENABLE_SLACK`: Set to "true" to enable Slack integration
- `ENABLE_GITHUB_IMPORTER`: Set to "true" to enable GitHub project importing
- `ENABLE_JIRA_IMPORTER`: Set to "true" to enable Jira project importing
- `ENABLE_TRELLO_IMPORTER`: Set to "true" to enable Trello project importing

## Full Stack Setup

The docker-compose.yml file includes commented sections for running a complete Taiga stack including:

- Taiga Backend
- PostgreSQL Database
- RabbitMQ for events
- Taiga Events service

To use the full stack, uncomment these sections in the docker-compose.yml file and configure them according to your needs.

## Customization

If you need to customize the Taiga frontend further, you can:

1. Modify the Dockerfile in the docker directory
2. Build a custom image
3. Update the docker-compose.yml file to use your custom image

## Troubleshooting

If you encounter issues:

1. Check the container logs:
   ```
   docker-compose logs taiga-front
   ```

2. Ensure your backend services are properly configured and accessible
3. Verify that the environment variables are set correctly

## Additional Resources

- [Taiga Documentation](https://docs.taiga.io/)
- [Taiga Community](https://community.taiga.io/)
- [Taiga GitHub Repository](https://github.com/taigaio/taiga-front)
