# Choncc Next.js Project Structure

## 1) Structural Goals

This structure is designed for:

- Scalability to enterprise-grade SDLC feature breadth.
- Clear separation between domain logic, UI composition, and infrastructure concerns.
- Fast onboarding and maintainability for long-lived code.
- High testability and low coupling.

Key principle: organize by business domain first, then by technical layer.

---

## 2) Recommended Top-Level Layout

```txt
choncc/
  app/
  components/
  features/
  lib/
  hooks/
  types/
  styles/
  public/
  supabase/
  scripts/
  tests/
  docs/
  .github/
  Dockerfile
  docker-compose.yml
  next.config.ts
  tailwind.config.ts
  tsconfig.json
  package.json
```

---

## 3) App Router Layout Strategy

```txt
app/
  (marketing)/
    page.tsx
    layout.tsx
  (auth)/
    login/page.tsx
    signup/page.tsx
    layout.tsx
  (app)/
    layout.tsx
    workspace/
      [workspaceId]/
        layout.tsx
        board/page.tsx
        backlog/page.tsx
        analytics/page.tsx
        settings/page.tsx
    api/
      v1/
        workspaces/route.ts
        sprints/route.ts
        tasks/route.ts
        analytics/route.ts
  global-error.tsx
  not-found.tsx
  layout.tsx
  globals.css
```

Why this is chosen:

- Route groups separate public/auth/application concerns cleanly.
- Workspace-scoped routes model the core multi-tenant navigation naturally.
- Versioned API routes under app/api/v1 support controlled evolution.

---

## 4) Feature-Driven Domain Modules

```txt
features/
  workspace/
    components/
    hooks/
    server/
    validators/
    mappers/
    types.ts
  sprint/
    components/
    dnd/
    server/
    timers/
    validators/
    types.ts
  backlog/
    components/
    filters/
    server/
    validators/
    types.ts
  framework/
    components/
    policies/
    server/
    validators/
    types.ts
  analytics/
    components/
    server/
    serializers/
    types.ts
  auth/
    components/
    server/
    guards/
    types.ts
```

Why this is chosen:

- Keeps sprint logic close together across UI, server actions, validation, and mapping.
- Avoids fragile “all hooks in one place, all services in another” anti-pattern.
- Enables incremental extraction into services or packages later if needed.

---

## 5) Shared UI and Design System

```txt
components/
  ui/
    button.tsx
    input.tsx
    modal.tsx
    tabs.tsx
    badge.tsx
    tooltip.tsx
  layout/
    three-pane-shell.tsx
    workspace-nav-pane.tsx
    sprint-board-pane.tsx
    backlog-pane.tsx
  feedback/
    empty-state.tsx
    error-state.tsx
    loading-state.tsx
```

Guidance:

- components/ui: low-level reusable primitives.
- components/layout: Choncc-specific composition components.
- Keep styling token-driven and variant-based.

---

## 6) Core Libraries and Infrastructure Utilities

```txt
lib/
  auth/
    session.ts
    permissions.ts
  db/
    client.ts
    query-helpers.ts
    pagination.ts
  cache/
    keys.ts
    revalidate.ts
  observability/
    logger.ts
    tracing.ts
    metrics.ts
  security/
    csrf.ts
    sanitize.ts
    rate-limit.ts
  utils/
    date.ts
    id.ts
    math.ts
    objects.ts
```

Guidance:

- lib contains cross-domain infrastructure and pure helpers.
- Business use cases should stay inside feature modules.

---

## 7) Hooks Strategy

```txt
hooks/
  use-media-query.ts
  use-local-storage.ts
  use-keyboard-shortcuts.ts
  use-debounced-value.ts
```

Rules:

- hooks folder is only for truly cross-feature hooks.
- Feature-specific hooks stay inside each feature folder.

---

## 8) Type Strategy

```txt
types/
  api.ts
  database.ts
  common.ts
  events.ts
```

Rules:

- Keep global contracts in types.
- Keep domain-specific narrow types near features.
- Prefer generated DB types from Supabase as source of truth.

---

## 9) Supabase and Database Artifacts

```txt
supabase/
  migrations/
  seed/
  policies/
  functions/
  config.toml
```

Guidance:

- Version SQL migrations in source control.
- Keep RLS policy SQL explicit and reviewable.
- Never hide schema changes in ad-hoc scripts.

---

## 10) Testing Layout

```txt
tests/
  unit/
    features/
    lib/
  integration/
    api/
    db/
  e2e/
    sprint-flow.spec.ts
    backlog-dnd.spec.ts
  fixtures/
  factories/
```

Guidance:

- Unit tests close to pure logic.
- Integration tests verify API + DB contracts.
- E2E validates critical user journeys and complex interactions.

---

## 11) API and Server Boundaries

Recommended split:

- Server Actions: mutation-heavy workflows scoped to page context.
- API routes: external integrations, webhooks, and public contracts.
- Client-side data fetching: non-sensitive, interaction-heavy reads.

Keep business logic centralized in feature/server modules so both Server Actions and API routes reuse the same use cases.

---

## 12) Naming and Conventions

- Files: kebab-case for files, PascalCase for React components.
- Route handlers: route.ts.
- Shared constants: SCREAMING_SNAKE_CASE.
- Database entities: snake_case in SQL, mapped to typed models in application code.

Example naming:

- sprint-capacity-card.tsx
- use-sprint-capacity.ts
- create-sprint.action.ts
- sprint.repository.ts

---

## 13) Why This Structure Fits a Massive SDLC Product

- Modular growth: each SDLC capability can evolve as a domain module.
- Operational safety: clear boundaries reduce side effects and accidental coupling.
- Team scalability: if contributors are added later, ownership can be feature-based.
- Refactor readiness: feature modules can be extracted into packages/services with minimal disruption.
- Framework extensibility: SDLC-specific engines (Agile/Kanban/Waterfall) can coexist under a shared contract model.

---

## 14) Future Expansion Pattern

When adding a new SDLC mode:

1. Create a new feature module (for example, features/waterfall).
2. Implement policy adapters for transitions/validations.
3. Add schema extension and migration.
4. Expose mode-specific UI panels behind framework capability flags.
5. Add integration and E2E coverage for mode workflows.

This preserves architecture consistency while enabling controlled evolution.
