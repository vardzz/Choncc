# Choncc Technology Stack Blueprint

## 1) Stack Summary

Primary stack:

- Frontend and full-stack framework: Next.js (App Router) + React + TypeScript
- Styling system: Tailwind CSS + design tokens
- Database and auth: Supabase (PostgreSQL + Auth + RLS)
- Deployment platform: Vercel for web delivery + Docker for consistent build/runtime packaging
- CI/CD: GitHub Actions
- Observability: Sentry + OpenTelemetry-compatible logging/tracing strategy

This combination provides fast iteration, strong type safety, secure multi-tenant data handling, and production-grade deployment ergonomics.

---

## 2) Why Next.js Is the Foundation

### Capabilities relevant to Choncc

- App Router supports server-centric data boundaries and nested layout composition, ideal for 3-pane persistent UI.
- Server Components reduce client bundle pressure for complex productivity interfaces.
- Server Actions enable ergonomic mutation workflows (task moves, sprint updates) with minimal API boilerplate.
- Route handlers support versioned APIs for external clients and integrations.

### Architectural role

- Acts as both web UI delivery layer and BFF (backend-for-frontend).
- Central place for auth checks, middleware-based route protection, and data orchestration.

---

## 3) Why TypeScript Is Non-Negotiable

### Value

- Enforces data contract integrity across UI, server logic, and database mappings.
- Reduces runtime defects in complex state flows (drag-and-drop, timer events, workflow transitions).
- Enables safer refactors as SDLC modules expand.

### Interaction with other stack layers

- Supabase generated types can flow directly into repositories/services.
- API and Server Action payloads can be validated and inferred with schema validators.

---

## 4) Why Tailwind CSS for UI Velocity and Consistency

### Value

- Fast prototyping and high visual consistency with utility-first composition.
- Design token integration enables controlled theming and future branding expansion.
- Works well with component variants for role/state-heavy interfaces.

### Choncc-specific relevance

- Efficient for implementing dense, high-information productivity layouts.
- Supports responsive pane logic and interaction states without bloated CSS.

---

## 5) Why Supabase (PostgreSQL + Auth + RLS)

### PostgreSQL strengths

- Mature relational modeling for multi-entity SDLC data (workspaces, sprints, tasks, events).
- Strong indexing and query planner support for analytics-heavy features.
- JSONB support for extensible metadata and framework-specific payloads.

### Supabase Auth strengths

- Rapid, secure auth bootstrap with modern OAuth/email flows.
- Easy integration with Next.js server runtime.

### Row Level Security strengths

- Enforces tenant and role isolation at the database layer.
- Prevents accidental data leaks caused by application-layer mistakes.

### Choncc-specific relevance

- Multi-workspace access and role policies map naturally to RLS.
- High-confidence access control for project manager and developer roles.

---

## 6) Why Vercel + Docker Together

### Vercel role

- Excellent fit for Next.js deployment and edge delivery.
- Fast previews for every pull request.
- Managed operational surface for solo development efficiency.

### Docker role

- Reproducible local and CI environments.
- Future portability to alternative infrastructure if needed.
- Consistent build behavior across machines.

### Combined strategy

- Primary web deployment on Vercel for speed.
- Docker used for local parity, CI validation, and optional self-host/enterprise trajectory.

---

## 7) Recommended Supporting Technologies

- Validation: Zod
  - Runtime validation for input payloads and API boundaries.
- Data fetching and cache control: TanStack Query (client-side where needed)
  - Useful for interaction-heavy live board surfaces.
- Drag and drop: dnd-kit
  - Flexible and high-performance for nested drag scenarios.
- Forms: React Hook Form
  - Efficient form state management with schema resolvers.
- Realtime and eventing: Supabase Realtime (selective use)
  - For collaborative updates and board synchronization.
- Testing:
  - Unit and integration: Vitest or Jest.
  - E2E: Playwright.

---

## 8) Interaction Architecture

```txt
User Browser
  -> Next.js App Router UI (Server + Client Components)
  -> Server Actions / Route Handlers
  -> Domain Services (feature modules)
  -> Supabase (PostgreSQL + Auth + RLS)
  -> Observability (logs, traces, alerts)
```

Data flow pattern:

- Read-heavy views: server-side fetch with selective client hydration.
- Mutation flows: Server Actions with optimistic UI where safe.
- External/public integration: versioned API routes.

---

## 9) Deployment Pipeline Interaction

```txt
Git Push
  -> GitHub Actions (lint, test, build, security checks)
  -> Preview deploy on Vercel
  -> Database migration validation
  -> Manual/automated promotion to production
```

Principles:

- Every release is traceable to migration versions.
- Build artifacts are reproducible (Docker image optional but recommended).
- Rollback paths exist for both app and schema.

---

## 10) Why This Stack Is Ideal for Choncc

- High development throughput without sacrificing architecture quality.
- Strong security posture through layered controls (middleware, auth, RLS, validation).
- Natural support for rich productivity UX and high interaction complexity.
- Excellent path from solo MVP to team-scale product.
- Low operational burden while preserving future portability and enterprise readiness.

---

## 11) Suggested Versioning Policy

- Node.js: Active LTS.
- Next.js: latest stable minor, upgrade monthly after compatibility review.
- TypeScript: latest stable minor, strict mode enabled.
- PostgreSQL: managed Supabase version pinned by project environment.
- Dependencies: weekly minor update window, monthly security review.

This keeps the stack modern while controlling upgrade risk.
