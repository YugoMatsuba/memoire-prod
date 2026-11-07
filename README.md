# mémoire

A social memory-sharing application for saving experiences, exploring them on an interactive globe, and sharing them with friends and groups.

## Functionality

Planned features:

- User accounts and authentication.
- Memories with photos, videos, dates, and locations.
- Interactive globe and timeline browsing.
- Friends, groups, comments, and reactions.
- Direct and group messaging, search, and notifications.

Currently implemented: login and registration forms with client-side routing and placeholder API requests, plus a backend health endpoint. Authentication APIs and database integration are still to be implemented.

## Local setup

Install Docker with Docker Compose, then run from the project root:

```sh
docker compose up --build
```

This starts three containers:

| Service | Container | Technology | Local access |
| --- | --- | --- | --- |
| `client` | `memoire-client` | React, TypeScript, Vite | http://localhost:5173 |
| `server` | `memoire-server` | Python, FastAPI | http://localhost:8000 |
| `db` | `memoire-postgres` | PostgreSQL 17 | `localhost:5433` |

The frontend redirects `/` to `/login`; registration is available at `/register`. API documentation is available at http://localhost:8000/docs and the health endpoint at http://localhost:8000/health.

The development database is `memoire_dev`, with username `memoire` and password `memoire_password`, as configured in `docker-compose.yaml`. Containers reach PostgreSQL at `db:5432`.

Stop the services with Ctrl+C, or run:

```sh
docker compose down
```

Database data persists in the `postgres_data` volume. Frontend source files are shared with the container, while its dependencies use a separate `/app/node_modules` volume. After changing frontend dependencies, synchronize the running container:

```sh
docker compose exec client npm ci
docker compose restart client
```

## High-level software design

The local environment has a React client, a FastAPI server, and PostgreSQL. The intended request flow is:

```text
React frontend → FastAPI backend → PostgreSQL
```

### Frontend

Use a feature-based structure. `App` defines routes, page components render the UI, and custom hooks manage behavior and request state.

```text
client/src/features/auth/
├── ui/       # Page components and styles
└── hooks/    # Form submission logic and request state
```

### Backend

Use four layers as backend features are implemented:

- **Presentation:** Routes, request/response schemas, and HTTP error mapping.
- **Application:** Service classes coordinating use cases.
- **Domain:** Entities, business rules, and repository interfaces.
- **Infrastructure:** Repository implementations, ORM models, and external clients.

See the [frontend design](docs/design/adr/005-frontend-software-design.md), [backend design](docs/design/adr/004-backend-software-design.md), and [requirements](docs/requirements.md) for details. The [architecture diagram](docs/design/architecture.md) describes the broader planned system, including future core, chat, and media services.
