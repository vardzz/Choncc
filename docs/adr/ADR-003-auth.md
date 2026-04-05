# ADR-003: Authentication and Authorization Baseline

- Status: Accepted
- Date: 2026-04-05

## Context

Choncc requires secure user identity management, role-based access, and tenant-safe data boundaries.

## Decision

Use Supabase Auth for authentication and enforce authorization with a layered model:

- App-level permission checks in server actions and route handlers.
- Database-level isolation and constraints with row-level security policies.

## Consequences

Positive:

- Faster authentication foundation for early phases.
- Defense in depth for permission-sensitive operations.

Trade-offs:

- Policy complexity must be actively managed and tested.
- Requires clear ownership of role mapping and permission rules.

## Alternatives Considered

- Custom authentication service: rejected due to higher implementation and security risk in early phases.
- App-only authorization: rejected due to insufficient data-layer safeguards.
