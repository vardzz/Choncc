# ADR-002: Data Layer and Persistence

- Status: Accepted
- Date: 2026-04-05

## Context

Choncc needs relational consistency, tenant isolation, auditability, and extensibility across multiple SDLC models.

## Decision

Use Supabase PostgreSQL as the primary data layer with relational schema, constrained entities, and policy-enforced access patterns.

## Consequences

Positive:

- Strong relational integrity for sprint and task workflows.
- Good performance and indexing capabilities for analytics growth.
- Natural alignment with row-level security for tenant isolation.

Trade-offs:

- Requires careful migration discipline.
- Requires explicit policy testing for authorization safety.

## Alternatives Considered

- Document-first store: rejected due to weaker relational guarantees for planning workflows.
- Self-managed PostgreSQL from day one: rejected to reduce operational burden in early phases.
