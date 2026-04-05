# Choncc Project Structure (UI-First Monorepo Layout)

## 1) Purpose

This document defines the root-level architecture for Choncc after the UI-first strategy pivot.

Primary goals:

- Build the complete frontend experience first, including high-fidelity interactions and drag-and-drop workflows, using mock/static data.
- Keep backend work isolated until the UI behavior and information architecture are validated.
- Separate concerns clearly at the repository root so implementation order and ownership are always obvious.

---

## 2) Root-Level Directory Strategy

Choncc uses three primary top-level directories:

- /frontend: Product UI application (Next.js App Router + Tailwind CSS + React state and interactions).
- /backend: Supabase and data platform assets (schema, migrations, seed data, auth and security policies, edge functions).
- /docs: All planning, architecture, product, and operational documentation.

### Canonical Root Tree

```txt
choncc/
|-- frontend/
|-- backend/
`-- docs/
```

This intentionally avoids mixing frontend runtime code with backend database concerns in the same root namespace.

---

## 3) Frontend Structure (/frontend)

The frontend is organized for fast UI iteration and strict separation between reusable UI, feature logic, and mock-data simulation.

```txt
frontend/
|-- package.json
|-- next.config.ts
|-- tsconfig.json
|-- postcss.config.cjs
|-- tailwind.config.ts
|-- .env.example
|
|-- src/
|   |-- app/
|   |   |-- (ui)/
|   |   |   |-- layout.tsx
|   |   |   |-- page.tsx
|   |   |   `-- workspace/
|   |   |       `-- [workspaceSlug]/
|   |   |           |-- page.tsx
|   |   |           |-- board/page.tsx
|   |   |           |-- backlog/page.tsx
|   |   |           `-- settings/page.tsx
|   |   |-- globals.css
|   |   `-- favicon.ico
|   |
|   |-- components/
|   |   |-- ui/                      # Generic design-system primitives
|   |   |-- layout/                  # 3-pane shell, resizable/collapsible panes
|   |   `-- feedback/                # Empty/loading/error visual states
|   |
|   |-- features/
|   |   |-- shell/                   # App chrome, navigation, pane orchestration
|   |   |-- board/                   # Kanban lanes, cards, DnD interactions
|   |   |-- sprint/                  # Sprint timers, counters, sprint status UX
|   |   `-- backlog/                 # Backlog filters, ordering, task previews
|   |
|   |-- hooks/
|   |   |-- use-pane-layout.ts
|   |   |-- use-board-dnd.ts
|   |   |-- use-sprint-timer.ts
|   |   `-- use-local-storage.ts
|   |
|   |-- state/
|   |   |-- stores/                  # Zustand/Redux stores for UI-only state
|   |   |-- selectors/
|   |   `-- actions/
|   |
|   |-- mock/
|   |   |-- data/                    # Static JSON/TS mock datasets
|   |   |-- factories/               # Builders for fake tasks/sprints/users
|   |   `-- scenarios/               # Scenario presets (small team, overloaded sprint)
|   |
|   |-- lib/
|   |   |-- constants/
|   |   |-- utils/
|   |   `-- types/
|   |
|   `-- styles/
|       |-- tokens.css
|       `-- animations.css
|
`-- public/
     |-- icons/
     |-- images/
     `-- fonts/
```

### Frontend Organization Principles

- Feature-first composition: complex interaction logic lives inside /features, not in global utility folders.
- Reusable components remain intentionally presentational; business-like UI behavior lives in feature modules.
- Mock data is first-class and versioned in /mock, enabling realistic user flows before any API exists.
- State is local-first and interaction-driven, designed to feel production-ready while remaining backend-independent.

---

## 4) Backend Structure (/backend)

The backend folder is initialized after the UI interaction model is proven. It contains all Supabase and persistence concerns.

```txt
backend/
|-- supabase/
|   |-- config.toml
|   |
|   |-- migrations/
|   |   |-- 0001_init.sql
|   |   |-- 0002_auth_tables.sql
|   |   |-- 0003_sprint_entities.sql
|   |   `-- 0004_rls_policies.sql
|   |
|   |-- schema/
|   |   |-- core.sql               # Users, workspaces, membership
|   |   |-- planning.sql           # Epics, stories, tasks, backlog
|   |   `-- sprints.sql            # Sprint windows, timers, snapshots
|   |
|   |-- seed/
|   |   |-- dev.seed.sql
|   |   `-- test.seed.sql
|   |
|   |-- policies/
|   |   |-- workspaces.sql
|   |   |-- projects.sql
|   |   |-- sprints.sql
|   |   `-- tasks.sql
|   |
|   `-- functions/
|       |-- auth-hooks/
|       `-- domain-automation/
|
|-- scripts/
|   |-- reset-db.ps1
|   |-- run-migrations.ps1
|   `-- seed-db.ps1
|
`-- README.md
```

### Backend Organization Principles

- Migrations are append-only and represent release-safe schema evolution.
- /schema is declarative and human-readable; /migrations is chronological and executable.
- Seed data supports local integration and deterministic test fixtures.
- Security policy SQL is explicit and isolated to simplify RLS auditing.

---

## 5) Documentation Structure (/docs)

All planning artifacts remain inside /docs and act as the decision log for product, architecture, delivery, and standards.

```txt
docs/
|-- 00-phase0-signoff.md
|-- 01-phases.md
|-- 02-structure.md
|-- 03-techstack.md
|-- ...
`-- adr/
     |-- ADR-001-framework.md
     |-- ADR-002-data-layer.md
     |-- ADR-003-auth.md
     `-- ADR-004-deployment.md
```

---

## 6) Why Strict Separation Supports UI-First

1. It protects momentum in early product shaping.
   UI and interaction work can move at full speed without waiting on database/auth decisions.

2. It prevents premature backend coupling.
   No API contract pressure while navigation, pane behavior, drag-and-drop ergonomics, and information density are still evolving.

3. It makes replacement from mock to real data predictable.
   Frontend feature modules can swap mock providers for Supabase providers with minimal structural churn.

4. It improves quality of backend implementation later.
   Backend schema and auth can be built against validated UX flows instead of assumptions.

5. It reduces architectural drift in solo development.
   Folder boundaries clarify where each decision belongs and lower accidental cross-layer complexity.

---

## 7) Conventions and Guardrails

- Frontend must not import backend assets directly.
- Backend should expose versioned contracts that map to already-validated UI states.
- Mock contracts in /frontend/src/mock define the expected data shape before API wiring.
- Any new cross-layer decision must be documented in /docs and, when architectural, captured as an ADR.

---

## 8) Adoption Checklist

- Confirm root contains exactly /frontend, /backend, and /docs as primary directories.
- Build all UI flows and interaction states in /frontend with mock/static data first.
- Create /backend only when Phase 3 begins.
- Keep docs current as structure evolves.
