# Software Development Process

This document describes the standard development workflow for mémoire. Each change should move through requirements, design, implementation, testing, CI, and merge review.

## Development Philosophy

mémoire follows the idea behind broken window theory: when small problems are ignored, they make larger problems feel acceptable. A messy document, skipped design record, missing test, unclear commit, or inconsistent implementation can slowly lower the quality standard of the whole codebase.

For that reason, every detail matters. Requirements should be clear, architectural decisions should be captured in ADRs, implementation decisions should be captured in IDRs, and important behaviour should be protected by tests. The goal is not bureaucracy. The goal is to keep the codebase understandable, reliable, and clean enough that future work remains safe and fast.

Each change should leave the project in a better state than before. If a decision is made, document it. If behaviour changes, test it. If code is touched, keep it consistent with the surrounding code. Small acts of care compound into a codebase that is easier to trust.

## 1. Requirements Gathering

- Read the GitHub issue carefully.
- Check whether the change affects frontend, backend, infrastructure, documentation, or multiple areas.
- Clarify unclear requirements before starting implementation.

## 2. Planning and Design

- Plan the implementation before writing code.
- Identify affected services, APIs, data models, permissions, and user flows.
- If the change affects high-level architecture, create an Architecture Decision Record (ADR).
- If the change affects code implementation, create an Implementation Design Record (IDR).
- Use the templates in `docs/design/adr/` and `docs/design/idr/`.

## 3. Implementation

- Implement the change according to the approved plan or design record.
- Follow existing code style, naming, and project structure.
- Finalise the ADR or IDR with the decisions made and the reasons behind them.

## 4. Unit Testing

- Write unit tests for new or changed business logic.
- Backend unit tests should use `pytest`.
- Frontend unit tests should use `Vitest`.

## 5. Integration Testing

- Add integration tests when a change involves multiple components or external systems.
- Backend integration tests should cover service interactions with dependencies such as PostgreSQL, Redis, MongoDB, or object storage.
- Verify API behaviour, database persistence, background jobs, and real-time flows where relevant.

## 6. Continuous Integration

- Push the branch to the remote repository.
- Run CI using GitHub Actions.
- Confirm formatting, linting, unit tests, and integration tests pass.
- Fix any CI failures before requesting or completing review.

## 7. Merge to Main

- Merge the change into `main` only after tests pass and the change has been reviewed.
