# Mémoire Design Document

## 1. Product Vision

**Mémoire** is a social memory-sharing platform built around the idea of **"Your world, all in one place."** The application helps users save meaningful memories, attach them to real-world locations, revisit them through an interactive globe, and share selected experiences with friends or groups.

Mémoire is not designed as a traditional photo feed. Its core experience is geographical and personal: users should feel that they are building a living map of their life, where places, people, photos, trips, comments, and conversations are connected.

## 2. Target Users

- People who travel and want to organise memories by location.
- Friend groups who want a shared space for trips, events, and experiences.
- Users who prefer a visual memory map instead of a chronological-only feed.
- Families, couples, classmates, or travel groups who want private shared albums with messaging.

## 3. Core Experience

The main screen of Mémoire is an interactive globe. Users can rotate, zoom, and explore locations where they have created memories. Each memory appears as a pin or cluster on the globe. Selecting a location opens the related memories, photos, descriptions, dates, participants, and comments.

The application should support both personal memories and shared memories. A personal memory belongs to one user, while a group memory can be visible to members of a group. Users should be able to move between map-based exploration, chronological timeline browsing, search, messaging, and group spaces without feeling like they are using separate products.

## 4. High-Level Architecture

Mémoire uses a web-based architecture:

```text
React + TypeScript Frontend
        |
        v
API Gateway
        |
        +--> Core Service
        +--> Chat Service
        +--> Media Service
        +--> Background Workers
```

The architecture is microservices-oriented, but the first version should avoid unnecessary fragmentation. The system should separate services where the domain has different scaling, storage, or real-time requirements.

## 5. Frontend Design

The frontend is built with **React** and **TypeScript**.

Main responsibilities:

- Render the interactive globe and memory pins.
- Provide screens for memory creation, viewing, editing, and deletion.
- Manage authentication state and user sessions.
- Display friends, groups, timelines, notifications, and messages.
- Communicate with backend APIs through a single API layer.
- Connect to WebSocket endpoints for real-time chat and updates.

Important frontend views:

- **Globe View**: primary spatial memory browser.
- **Memory Detail View**: full view of a memory, photos, location, description, comments, and visibility.
- **Create/Edit Memory View**: form for adding title, description, date, photos, location, tagged friends, and group.
- **Timeline View**: chronological list of memories.
- **Groups View**: group list, group detail, shared memories, and group chat.
- **Friends View**: friend search, requests, profiles, and friend globes.
- **Messages View**: direct messages and group conversations.
- **Search View**: search across users, locations, memories, and groups.
- **Notifications View**: invitations, comments, messages, and friend activity.

## 6. Backend Services

### 6.1 API Gateway

The API Gateway is the single entry point for frontend requests.

Responsibilities:

- Route requests to the correct backend service.
- Verify authentication tokens.
- Apply authorization checks where appropriate.
- Validate common request structure.
- Support rate limiting.
- Provide centralised logging and request tracing.

### 6.2 Core Service

The Core Service manages the main application domain.

Responsibilities:

- Users and profiles.
- Friendships and friend requests.
- Groups and group membership.
- Memories and memory metadata.
- Locations and geographic queries.
- Comments and reactions.
- Permissions and visibility rules.

Recommended storage:

- **PostgreSQL** for relational data.
- **PostGIS** for geographic location storage and queries.

### 6.3 Chat Service

The Chat Service handles real-time messaging.

Responsibilities:

- Direct conversations between friends.
- Group conversations.
- Message history.
- Conversation membership.
- WebSocket connection management.
- Real-time message delivery.

Recommended storage:

- **MongoDB** for flexible conversation and message documents.
- **Redis Pub/Sub** for distributing real-time messages across service instances.

### 6.4 Media Service

The Media Service handles uploaded photos and other media.

Responsibilities:

- Upload media files.
- Store media metadata.
- Generate thumbnails.
- Extract optional EXIF metadata.
- Serve media through secure URLs.
- Enforce access permissions before media retrieval.

Recommended storage:

- **S3-compatible object storage**.
- **MinIO** for local development.
- Cloud object storage for production.

### 6.5 Background Workers

Background workers process expensive or asynchronous work outside the main request lifecycle.

Example tasks:

- Thumbnail generation.
- Image optimisation.
- EXIF metadata extraction.
- Notification dispatch.
- Search index updates.
- Cleanup of failed uploads.

Recommended tooling:

- **Celery** for background jobs.
- **Redis** as broker/cache where appropriate.

## 7. Data Model Overview

### User

Represents an account in Mémoire.

Key fields:

- `id`
- `username`
- `email`
- `display_name`
- `avatar_url`
- `bio`
- `created_at`
- `updated_at`

### Memory

Represents a saved memory attached to a time and place.

Key fields:

- `id`
- `owner_id`
- `group_id`
- `title`
- `description`
- `memory_date`
- `visibility`
- `latitude`
- `longitude`
- `place_name`
- `created_at`
- `updated_at`

Visibility values:

- `private`
- `friends`
- `group`
- `public`

### Media

Represents uploaded photos or files attached to memories.

Key fields:

- `id`
- `memory_id`
- `uploader_id`
- `object_key`
- `thumbnail_key`
- `media_type`
- `metadata`
- `created_at`

### Group

Represents a shared space for trips, events, or communities.

Key fields:

- `id`
- `name`
- `description`
- `owner_id`
- `created_at`
- `updated_at`

### Group Membership

Represents a user's membership and role inside a group.

Key fields:

- `id`
- `group_id`
- `user_id`
- `role`
- `joined_at`

Roles:

- `owner`
- `member`

### Friendship

Represents a social connection or pending request between users.

Key fields:

- `id`
- `requester_id`
- `receiver_id`
- `status`
- `created_at`
- `updated_at`

Statuses:

- `pending`
- `accepted`
- `blocked`

### Message

Represents a chat message.

Key fields:

- `id`
- `conversation_id`
- `sender_id`
- `body`
- `attachments`
- `created_at`
- `read_by`

## 8. Permission Model

Permissions should be consistent across memories, media, comments, groups, and messages.

Core rules:

- A user can always view and edit their own private memories.
- A user can view a friend's memory only when the memory visibility allows friends.
- A user can view a group memory only when they are a member of that group.
- Only group owners can remove members or delete the group.
- Members can create shared memories inside groups unless the group settings later restrict this.
- Media access must follow the permissions of the memory or group it belongs to.
- Direct messages are visible only to conversation participants.

## 9. API Design Overview

Example endpoint groups:

```text
/auth
/users
/friends
/groups
/memories
/media
/comments
/search
/notifications
/conversations
/messages
```

Example memory endpoints:

```text
GET    /memories
POST   /memories
GET    /memories/{memory_id}
PATCH  /memories/{memory_id}
DELETE /memories/{memory_id}
GET    /memories/nearby
```

Example group endpoints:

```text
GET    /groups
POST   /groups
GET    /groups/{group_id}
PATCH  /groups/{group_id}
DELETE /groups/{group_id}
POST   /groups/{group_id}/members
DELETE /groups/{group_id}/members/{user_id}
```

Example messaging endpoints:

```text
GET    /conversations
POST   /conversations
GET    /conversations/{conversation_id}/messages
POST   /conversations/{conversation_id}/messages
WS     /ws/conversations/{conversation_id}
```

## 10. Real-Time Design

Real-time features should use WebSockets.

Initial real-time events:

- New direct message.
- New group message.
- Typing indicator.
- Message read receipt.
- New notification.
- Memory comment update.

For multi-instance deployment, Redis Pub/Sub can broadcast real-time events between backend instances.

## 11. Search Design

Search should support:

- User search by username or display name.
- Memory search by title, description, date, location, or group.
- Group search by name.
- Location search by place name.

The first implementation can use PostgreSQL indexes and text search. A dedicated search engine can be added later if search becomes more complex.

## 12. Non-Functional Design Goals

- **Security**: protect private memories, group data, and media files.
- **Privacy**: make memory visibility clear and enforce it consistently.
- **Scalability**: separate chat and media because they have different performance characteristics.
- **Reliability**: background jobs should be retryable.
- **Maintainability**: keep clear service boundaries and documented APIs.
- **Observability**: log important events and include request IDs across services.
- **Performance**: globe and timeline views should remain responsive with large memory collections.

## 13. Initial Build Scope

The first version should focus on a complete but narrow product loop:

1. User registration and login.
2. Create, view, edit, and delete memories.
3. Attach photos to memories.
4. Display memories on an interactive globe.
5. Add friends.
6. Create groups and add members.
7. Share memories with a group.
8. Send direct and group messages.
9. Show a chronological timeline.
10. Display basic notifications.

Advanced features such as AI memory summaries, public discovery feeds, advanced recommendation systems, and complex group permissions should be deferred until the core experience is reliable.
