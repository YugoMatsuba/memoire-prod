## Background and Problem

Backend services need a consistent structure that separates API handling, business rules, and infrastructure.

## Decision

Use a four-layer architecture within each service:

- **Presentation:** Routes, request/response schemas, and HTTP error mapping. Calls application services.
- **Application:** Service classes that coordinate entity logic
- **Domain:** Entities, business rules, and repository interfaces.
- **Infrastructure:** Repository implementations, ORM models, and external clients.

## Options

### Option 1: Four-layer architecture (selected)

👍**Pros**

- Clear responsibilities and independently testable business rules.
- Infrastructure can change without changing domain behavior.

👎**Cons**

- More interfaces and mapping code
