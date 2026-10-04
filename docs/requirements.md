# Requirements

## 1. Purpose

mémoire is a social memory-sharing application where users can save memories, connect them to real-world locations, share them with friends or groups, and communicate through real-time messaging.

Currently, there is no application for sharing memories well in groups. It is usually done by sending pictures/videos in group chats or sharing pictures through iCloud. The product goal is to create a single place where a user can explore their personal world through memories, locations, people, photos, timelines, and conversations.

## 2. Scope

The initial release should include:

- User accounts and authentication.
- Memory creation and management.
- Location-based memory browsing through an interactive globe.
- Photo/video upload and display.
- Friend connections.
- Groups for shared experiences.
- Friends' globe display and commenting.
- Direct and group messaging.
- Timeline browsing.
- Search.
- Notifications.
- Background media processing.

## 3. Functional Requirements

### 3.1 Authentication

- Users must be able to create an account.
- Users must be able to log in and log out.
- Users must be able to remain authenticated across page refreshes.
- The system must protect authenticated endpoints from unauthenticated access.
- The system should support password hashing and secure token-based authentication.

### 3.2 User Profiles

- Users must have a profile containing a username, display name, picture, and optional bio.
- Users must be able to view their own profile.
- Users must be able to edit their own profile.
- Users must be able to view other users' profiles when permitted.

### 3.3 Memories

- Users must be able to create a memory.
- A memory must support a title, description, date, location, visibility setting, photos, and videos.
- Users must be able to edit memories they own.
- Users must be able to delete memories they own.
- Users must be able to view memories they have permission to access.
- Users must be able to attach a memory to a latitude and longitude.
- Users should be able to add a human-readable place name to a memory.
- Users should be able to filter memories by date, location, owner, friend, or group.

### 3.4 Interactive Globe

- The application must display memories as pins or clusters on an interactive globe.
- Users must be able to zoom and rotate the globe.
- Users must be able to select a memory pin and open the related memory details.
- The globe must support multiple memories in nearby locations.
- The globe should load memory data efficiently and avoid rendering unnecessary items.

### 3.5 Timeline

- Users must be able to view memories in chronological order.
- Users must be able to filter the timeline by personal memories, friend memories, and group memories.
- The timeline should include memory title, date, location, preview image, and visibility.

### 3.6 Media Uploads

- Users must be able to upload photos or videos for a memory.
- Uploaded media must be stored outside the relational database.
- The system must store metadata for each uploaded file.
- The system should generate thumbnails for uploaded images.
- The system should process uploads asynchronously.
- Users must only be able to access media connected to memories they are allowed to view.

### 3.7 Friends

- Users must be able to search for other users.
- Users must be able to send friend requests.
- Users must be able to accept or reject friend requests.
- Users must be able to remove friends.
- Users must be able to view memories shared with friends.
- Users should be able to view a friend's globe.

### 3.8 Groups

- Users must be able to create groups.
- A group must have a name, description, owner, and members.
- Group roles must include `owner` and `member`.
- Group owners must be able to add or remove members.
- Group members must be able to view group memories.
- Group members must be able to send messages in the group chat.
- Users must be able to leave a group.
- Group owners must be able to delete a group.
- Memories shared in a group are displayed in the globe of everyone in the group.

### 3.9 Comments and Reactions

- Users must be able to comment on memories they can view.
- Users must be able to delete their own comments.
- Memory owners should be able to moderate comments on their own memories.
- Users should be able to react to memories or comments.

### 3.10 Messaging

- Users must be able to send direct messages to friends.
- Users must be able to participate in group chats.
- Messages must be delivered in real time when recipients are online.
- Users must be able to view message history.
- The system should support read receipts.

### 3.11 Notifications

- Users must receive notifications for friend requests.
- Users must receive notifications for accepted friend requests.
- Users must receive notifications for group invitations.
- Users must receive notifications for comments on their memories.
- Users must receive notifications for new messages.
- Users must be able to mark notifications as read.
- Users must receive notifications for background picture/video processing.

### 3.12 Search

- Users must be able to search for other users.
- Users must be able to search memories by title, description, location, or date.
- Users must be able to search groups by name.
- Search results must only include content the user is allowed to access.

## 4. Non-Functional Requirements

### 4.1 Security

- Passwords must be hashed before storage.
- Authentication tokens must be securely generated and validated.
- Private memories must never be returned to unauthorised users.
- Media URLs must not expose private files to unauthorised users.
- Backend services must validate user permissions before performing protected actions.

### 4.2 Privacy

- Users must be able to control memory visibility.
- Location data must be treated as sensitive information.
- The system must avoid exposing private location data through search, media metadata, or API responses.
- Visibility rules must be applied consistently across memory details, globe pins, timeline entries, search results, comments, and media.

### 4.3 Performance

- The globe view should remain responsive with many memories.
- API responses should be paginated where lists can become large.
- Expensive media tasks should run in background workers.
- Frequently accessed data may be cached with Redis.

### 4.4 Reliability

- Background jobs should be retryable.
- Failed media processing should not break memory creation.
- Services should return clear error messages for invalid requests.
- The system should log important failures for debugging.

### 4.5 Scalability

- Chat should be able to scale independently from the core application.
- Media storage should scale independently from metadata storage.
- Redis Pub/Sub should support message distribution across multiple chat service instances.
- Database queries for location-based browsing should use appropriate geographic indexes.

### 4.6 Maintainability

- Backend services should have clear ownership boundaries.
- API contracts should be documented.
- Business logic should be tested separately from HTTP routing where possible.
- The codebase should use consistent naming, validation, and error-handling patterns.
