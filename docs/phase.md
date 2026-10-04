# Project Phases

## Phase 1: Personal Memories Foundation

Phase 1 focuses on the foundation for personal memories. It includes local development setup, the Core Service, the Media Service, the API Gateway, the React frontend, authentication, memory creation, media upload, and displaying memories on the globe.

### Technology Scope

- Frontend: React
- Backend: FastAPI
- Database: PostgreSQL
- Media storage: object storage
- Issue scope: GitHub issues 1-11

### Local Architecture

```text
Browser / React
      |
      | http://localhost:8080
      v
API Gateway
      |
      +-------------------+
      |                   |
      v                   v
Core Service        Media Service
FastAPI :8001       FastAPI :8002
      |                   |
      v                   v
PostgreSQL          Media DB
                          |
                          v
                  Object Storage
```

### Issues

1. [Add project planning and design documentation](https://github.com/YugoMatsuba/memoire-prod/issues/1)
2. [Set up local development environment](https://github.com/YugoMatsuba/memoire-prod/issues/2)
3. [Set up Core Service application and database](https://github.com/YugoMatsuba/memoire-prod/issues/3)
4. [Implement user registration](https://github.com/YugoMatsuba/memoire-prod/issues/4)
5. [Implement login, authentication, and logout](https://github.com/YugoMatsuba/memoire-prod/issues/5)
6. [Implement interactive globe UI](https://github.com/YugoMatsuba/memoire-prod/issues/6)
7. [Set up CI](https://github.com/YugoMatsuba/memoire-prod/issues/7)
8. [Set up Media Service and local object storage](https://github.com/YugoMatsuba/memoire-prod/issues/8)
9. [Set up API Gateway for backend services](https://github.com/YugoMatsuba/memoire-prod/issues/9)
10. [Implement memory creation with media upload](https://github.com/YugoMatsuba/memoire-prod/issues/10)
11. [Display memories on the globe](https://github.com/YugoMatsuba/memoire-prod/issues/11)

## Phase 2: Media Processing

Phase 2 adds asynchronous media processing.

- Redis
- Celery
- EXIF extraction
- Thumbnail generation
- Image resizing
- Processing status tracking

## Phase 3: Friends

Phase 3 adds friend-based social features.

- Friend relationships
- Friend memory visibility
- Friend globe

## Phase 4: Groups

Phase 4 adds shared group memory features.

- Group membership
- Shared memories
- Group globe and content

## Phase 5: Social Interaction

Phase 5 adds interaction features around memories.

- Comments
- Reactions
- Notifications

## Phase 6: Chat

Phase 6 adds messaging features.

- Direct messages
- Group messages
- Real-time delivery
