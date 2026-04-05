# Choncc QA and Testing Strategy

## 1) Testing Objectives

Choncc requires a layered test strategy to protect:

- Interaction-heavy workflows (3-pane layout, drag-and-drop).
- Data correctness (sprint/task lifecycle integrity).
- Security boundaries (auth, RBAC, tenant isolation).
- Performance-sensitive user journeys.

Quality targets:

- Prevent regressions in core planning flows.
- Detect integration issues before deployment.
- Maintain confidence during fast iteration.

---

## 2) Recommended Tooling

Primary recommendations:

- Unit and integration tests: Vitest (or Jest if preferred by ecosystem familiarity).
- Component testing: React Testing Library.
- End-to-end testing: Playwright (recommended) or Cypress.
- API contract testing: supertest-like route tests or fetch-based integration harness.
- Static quality checks: ESLint + TypeScript strict mode.

Why Playwright is ideal here:

- Strong support for modern app flows.
- Reliable cross-browser automation.
- Powerful tracing and debugging artifacts.

---

## 3) Test Pyramid for Choncc

1. Unit tests (largest volume)

- Pure functions, validators, reducers, utility logic.
- Sprint calculations, capacity math, ordering algorithms.

2. Integration tests

- API routes + database interactions.
- Server Actions + repository layers.
- RLS and permission behavior.

3. E2E tests (critical journeys)

- Full user workflows across auth, backlog, sprint board, and analytics.

---

## 4) What to Test by Area

## 4.1 UI Rendering and 3-Pane Mechanics

- Pane collapse/expand behavior.
- Width resizing and persistence.
- Keyboard navigation and focus management.
- Responsive transitions (desktop to mobile patterns).

## 4.2 Drag-and-Drop Interactions

- Backlog to sprint move.
- Cross-column move with policy checks.
- Reordering within backlog and board columns.
- Conflict handling when simultaneous updates occur.

## 4.3 Sprint and Capacity Logic

- Sprint creation and date validations.
- Sprint start/complete transitions.
- Capacity threshold warnings.
- Velocity snapshot calculations.

## 4.4 Task Domain Integrity

- Status transition rules.
- Required field validations by state.
- Tagging and dependency constraints.
- Assignment and role permission checks.

## 4.5 Security and Access Control

- Unauthenticated request rejection.
- Unauthorized mutation rejection by role.
- Cross-workspace isolation verification.
- Input sanitization for user-generated content.

## 4.6 Data Exports and Analytics

- Export payload correctness and formatting.
- Analytics query correctness on seeded fixtures.
- Performance checks on realistic dataset sizes.

---

## 5) Database Testing Strategy

- Use isolated test database/schema per test run.
- Seed deterministic fixtures for repeatable results.
- Validate migrations on CI against a clean database.
- Include rollback/forward-fix simulation tests for critical migrations.

Key checks:

- Foreign key integrity.
- Constraint enforcement.
- Index-backed query behavior for hot paths.

---

## 6) E2E Critical User Journeys

Must-have scenarios:

1. Login -> workspace select -> create backlog item -> plan sprint -> move tasks -> complete sprint.
2. Project manager assigns tasks; developer updates status; permissions enforced correctly.
3. Drag-and-drop reorder with persistence after reload.
4. Sprint timer start/pause/resume reflected in UI and persisted logs.
5. Export sprint analytics and validate artifact content.

---

## 7) Non-Functional Testing

## 7.1 Performance Testing

- Measure board render and interaction latency under high task volume.
- Validate API response times for key endpoints.
- Track client bundle size budgets and regressions.

## 7.2 Reliability Testing

- Simulate transient API/database failures.
- Verify retry behavior and user feedback states.
- Ensure optimistic UI reconciliation under conflict scenarios.

## 7.3 Accessibility Testing

- Keyboard-only flow across core journeys.
- Screen reader labels and announcements.
- Color contrast and reduced motion compliance.

---

## 8) CI Quality Gates

Every pull request should run:

- Type checking.
- Linting.
- Unit tests.
- Integration tests.
- Targeted E2E smoke tests.

Main branch and release candidates should also run:

- Full E2E suite.
- Migration validation suite.
- Security checks.

Deployment should be blocked if any critical gate fails.

---

## 9) Test Data and Fixtures

Principles:

- Keep fixtures small but representative.
- Provide separate fixtures for edge and stress scenarios.
- Use factories for flexible entity creation.
- Avoid hidden coupling between tests.

Suggested fixture packs:

- small-team-scrum.json
- overloaded-sprint.json
- cross-workspace-security.json

---

## 10) Coverage and Quality Metrics

Recommended tracking:

- Branch and statement coverage for core domain logic.
- Mutation endpoint success/failure distribution in test telemetry.
- Flake rate of E2E tests.
- Mean time to detect regression.

Do not chase raw coverage percentage blindly; prioritize high-risk workflow coverage.

---

## 11) Example Testing Commands

```bash
npm run typecheck
npm run lint
npm run test:unit
npm run test:integration
npm run test:e2e
npm run test:e2e -- --project=chromium
```

---

## 12) Defect Triage and Release Policy

Defect severity model:

- P0: security/data integrity/critical workflow broken.
- P1: major feature degradation.
- P2: moderate usability or edge-case issue.
- P3: cosmetic or low-impact issue.

Release policy:

- No open P0 issues.
- P1 issues require explicit acceptance decision.
- Regression in sprint planning flow blocks release.

---

## 13) Testing Roadmap by Phase

Phase 1-2:

- Unit + integration baseline.
- Core E2E path for sprint flow.

Phase 3-4:

- Permission and analytics suite expansion.
- Multi-framework workflow validation.

Phase 5+:

- Performance and resilience suites strengthened.
- Security-focused test scenarios expanded.

This roadmap keeps test investment aligned with product maturity.
