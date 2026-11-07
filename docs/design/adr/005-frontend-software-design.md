## Background and Problem

The frontend needs a consistent structure that keeps related components, data, and logic together as features grow.

## Decision

Use a feature-based architecture:

- **app:** Entry point, routing, providers, and application setup.
- **features:** Feature-specific components, hooks, API calls
- **data:** Data types 
- **shared:** Reusable UI components and utilities independent of features.

Organize each feature into folders:

```text
features/<feature>/
├── ui/       # React components and their styles
└── hooks/    # Business logic hooks
```

UI components use hooks to handle behavior and request state.

Keep feature-specific code within its feature. Move code to shared folders only when multiple features need it.

## Options

### Option 1: Feature-based separation (selected)

👍**Pros**

- Related code stays together, making features easier to maintain.

👎**Cons**

- Requires clear boundaries to avoid duplication and cross-feature coupling.

### Option 2: Type-based separation

👍**Pros**

- Simple and easy to navigate for small applications.

👎**Cons**

- Feature changes span multiple folders as the application grows.
