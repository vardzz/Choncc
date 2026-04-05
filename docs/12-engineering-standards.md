# Choncc Engineering Standards and Branch Strategy (Phase 0)

## 1) Engineering Standards

Code quality baseline:

- TypeScript strict mode required.
- ESLint and formatting checks required on pull requests.
- No direct database writes from UI components.
- Domain logic lives in feature server modules.
- Input validation required at all mutation boundaries.

Testing baseline:

- Unit tests for domain logic and validators.
- Integration tests for mutation paths and permission checks.
- Smoke E2E coverage for critical sprint flow.

Security baseline:

- Authentication and authorization checks at every mutation entry point.
- Tenant-aware data access boundaries.
- No secrets in source control.

Performance baseline:

- Avoid avoidable re-renders on interaction-heavy screens.
- Paginate or virtualize large lists where needed.
- Track core interaction latency in critical board operations.

Documentation baseline:

- Every feature PR must include updated acceptance criteria and testing notes.
- API contract changes require updated API docs.

## 2) Git and Branch Strategy

Branch model:

- main: stable integration branch.
- feature/\*: short-lived implementation branches.
- hotfix/\*: urgent production repairs after launch.

Branch protections (recommended):

- Require pull request before merge to main.
- Require status checks: typecheck, lint, tests, build.
- Block merge on failed security checks.
- Require at least one review (self-review checklist minimum for solo workflow).

Commit standards:

- Use small, focused commits.
- Commit message format:
  - feat: add sprint creation mutation
  - fix: resolve backlog reorder conflict handling
  - docs: update phase 0 sign-off checklist

Release flow:

1. Implement on feature branch.
2. Open PR and run required checks.
3. Merge to main only after checks pass.
4. Promote via staging verification before production release.

## 3) Definition of Ready for Implementation Tickets

- Clear acceptance criteria.
- Data model impact identified.
- Security and permission impact identified.
- Test scope defined.

## 4) Definition of Done for Pull Requests

- Functional acceptance criteria met.
- Required tests added and passing.
- No high severity lint or type issues.
- Docs updated for behavior or contract changes.
- Rollback impact considered for schema or API changes.
