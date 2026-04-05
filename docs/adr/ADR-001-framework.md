# ADR-001: Application Framework Selection

- Status: Accepted
- Date: 2026-04-05

## Context

Choncc requires a high-interaction productivity UI, rapid iteration, and a unified full-stack development model.

## Decision

Use Next.js App Router with React and TypeScript as the primary framework.

## Consequences

Positive:

- Fast iteration for UI and server-side logic.
- Efficient route and layout composition for 3-pane shell UX.
- Strong ecosystem support and deployment compatibility.

Trade-offs:

- Requires discipline to keep domain logic out of UI files.
- Requires clear boundaries between server actions and route handlers.

## Alternatives Considered

- Separate frontend and backend frameworks: rejected due to increased overhead for initial phases.
- Traditional monolithic SSR framework: rejected due to weaker component/runtime ergonomics for this roadmap.
