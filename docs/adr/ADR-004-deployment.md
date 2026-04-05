# ADR-004: Deployment Platform and Runtime Packaging

- Status: Accepted
- Date: 2026-04-05

## Context

Choncc needs fast delivery loops, safe release promotion, and a future path to runtime portability.

## Decision

Use Vercel as the primary web deployment target and Docker for environment parity and portability.

## Consequences

Positive:

- Fast preview deployments and reduced ops overhead.
- Consistent build/runtime verification through container parity.
- Supports future migration to alternative hosting if needed.

Trade-offs:

- Dual deployment concerns must be documented clearly.
- CI must guard against environment drift between hosted and containerized paths.

## Alternatives Considered

- Container-only self-hosted strategy: rejected for slower startup velocity.
- Platform-only strategy without container parity: rejected due to portability and reproducibility concerns.
