# Choncc Hosting and DevOps Strategy

## 1) Deployment Objectives

Choncc deployment strategy must deliver:

- Fast, reliable release cycles for solo development.
- Safe schema evolution with rollback paths.
- Environment isolation and configuration discipline.
- High confidence production operations.

Primary platform decisions:

- Application hosting: Vercel.
- Database and auth: Supabase.
- Container parity and portability: Docker.
- CI/CD orchestration: GitHub Actions.

---

## 2) Environment Topology

Environments:

- Local
- Development (optional shared)
- Staging
- Production

Separation rules:

- Independent Supabase projects per staging and production.
- Distinct environment variables and secrets per environment.
- No shared credentials across environments.

Branch mapping (recommended):

- feature/\* -> preview deployments.
- main -> staging deployment.
- release tags or protected promotion -> production deployment.

---

## 3) CI/CD Pipeline Design

## 3.1 Pipeline Stages

1. Validate

- Install dependencies.
- Type checks.
- Lint checks.
- Unit and integration tests.

2. Build

- Next.js production build.
- Optional Docker image build for parity checks.

3. Security Gates

- Dependency vulnerability scan.
- Secret scanning.

4. Database Validation

- Dry-run migration checks against staging clone.
- Reject destructive migrations without explicit approval.

5. Deploy

- Automatic preview deployment for pull requests.
- Staging deployment on main merge.
- Production deployment via approval gate.

6. Post-Deploy Verification

- Smoke tests.
- Health endpoint checks.
- Error-rate baseline verification.

---

## 3.2 Example GitHub Actions Skeleton

```yaml
name: choncc-ci

on:
  pull_request:
  push:
    branches: [main]

jobs:
  validate-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "lts/*"
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm audit --audit-level=high

  deploy-staging:
    if: github.ref == 'refs/heads/main'
    needs: [validate-build, security]
    runs-on: ubuntu-latest
    steps:
      - run: echo "Trigger staging deploy"
```

---

## 4) Database Migration Strategy

Principles:

- Migration-first schema management.
- Immutable migration history in shared environments.
- Forward-only migrations with explicit rollback playbooks.

Workflow:

1. Create migration SQL file.
2. Test migration locally with realistic data sample.
3. Apply to staging and run integration tests.
4. Promote to production during controlled window.
5. Monitor query performance and error rates.

Safety requirements:

- Backfill scripts for non-null changes.
- Large table changes done in phased migrations.
- Index creation strategy mindful of lock behavior.

---

## 5) Staging vs Production Strategy

Staging purpose:

- Final verification of build, migration, and feature behavior.
- Load and smoke validation for release candidates.

Production purpose:

- User-facing stable environment with strict change controls.

Promotion strategy:

- Build once, promote same artifact where possible.
- Require manual approval for production promotion.
- Block promotion on failed staging smoke tests.

Rollback strategy:

- Application rollback: redeploy prior known-good artifact.
- Database rollback: forward-fix preferred; restore from backup for severe incidents.
- Maintain incident runbook with decision matrix.

---

## 6) Docker Usage Strategy

Even with Vercel hosting, Docker remains valuable for:

- Local environment consistency.
- CI reproducibility.
- Future self-hosted or enterprise deployment options.

Suggested Docker targets:

- App runtime image for parity checks.
- Optional worker image if asynchronous jobs are introduced later.

---

## 7) Secrets and Configuration Management

- Store secrets in Vercel/Supabase/GitHub encrypted stores.
- Never hardcode secrets in code or test fixtures.
- Maintain explicit environment variable matrix document.
- Rotate keys/tokens periodically and after security incidents.

Config validation:

- Startup checks for required env vars.
- Fail deployment if critical config missing.

---

## 8) Observability and Operational Readiness

Required telemetry:

- Application errors.
- Latency for critical endpoints.
- Build/deploy event tracking.
- Database performance indicators.

Recommended minimum:

- Error tracking tool integration.
- Structured logs with request correlation IDs.
- Availability checks and alert routing.

---

## 9) Release Management and Cadence

Recommended cadence:

- Continuous preview deployment for all PRs.
- Scheduled staging promotions (for example, daily or per milestone).
- Production release window with checklist and rollback owner assigned.

Release checklist highlights:

- Migration plan approved.
- Security checks passed.
- Smoke and regression tests green.
- Monitoring dashboards and alerts confirmed.

---

## 10) Backup, Recovery, and Disaster Planning

- Ensure automated database backups with retention policy.
- Test restore process quarterly.
- Document RTO/RPO targets.
- Keep contact and escalation paths current.

This creates operational resilience suitable for live production workloads.
