# Choncc Project Phases (Strict UI-First Execution Plan)

## 1) Delivery Philosophy

Choncc is now executed with a strict UI/UX-first methodology.

Core rule:

- No backend implementation, authentication, or persistence work begins until frontend interactions, layouts, and user flows are fully validated with mock/static data.

This strategy ensures that the product experience is proven before infrastructure complexity is introduced.

---

## 2) Phase Overview

| Phase | Title                            | Status    | Primary Focus                                         |
| ----- | -------------------------------- | --------- | ----------------------------------------------------- |
| 0     | Foundation and Naming            | Completed | Vision, scope boundaries, architecture intent         |
| 1     | UI/UX Shell and Layout           | Planned   | 3-pane shell, navigation, static screens              |
| 2     | Core Interactions and Mock State | Planned   | Drag-and-drop, sprint timers, realistic mock behavior |
| 3     | Backend and Database Setup       | Planned   | Supabase, PostgreSQL schema, authentication           |
| 4     | API Integration and Data Wiring  | Planned   | Replace mock data with live data + RLS                |
| 5     | Advanced SDLC Features           | Planned   | Multi-framework modes (Kanban, Waterfall)             |
| 6     | Deployment and Security          | Planned   | Hardening, CI/CD, production deployment               |

---

## 3) Detailed Phase Plan

## Phase 0 [Completed]: Foundation and Naming

### Objectives

- Finalize product identity and directional scope.
- Establish baseline documentation and architectural constraints.
- Confirm the UI-first implementation doctrine.

### Completed Outputs

- Core project naming and product framing.
- Initial documentation baseline and ADR direction.
- Preliminary standards for implementation and delivery.

### Exit Criteria (Met)

- Foundational decisions captured and signed off.
- Team-of-one execution path clear for Phase 1.

---

## Phase 1: UI/UX Shell and Layout

### Objective

Build the full visual shell in Next.js App Router + Tailwind CSS with a high-quality 3-pane layout and navigation, using only static/mock data.

### Scope

- Build the 3-pane responsive and collapsible interface:
  - Left pane: Workspace and navigation hierarchy.
  - Center pane: Primary planning board surface.
  - Right pane: Backlog and detail context panel.
- Implement top-level navigation, keyboard/accessibility foundations, and static route shells.
- Finalize visual language for layout, spacing, typography, and component composition.

### Explicitly Out of Scope

- Supabase setup.
- Authentication.
- API routes and data persistence.

### Exit Criteria

- Entire shell is production-grade from a UI perspective across desktop and mobile breakpoints.
- All primary screens can be navigated and demoed with static content only.

---

## Phase 2: Core Interactions and Mock State

### Objective

Implement all high-value interactions and local state behavior so the application feels fully functional without backend persistence.

### Scope

- Drag-and-drop Kanban board interactions:
  - Move cards between columns.
  - Reorder cards within columns.
  - Move backlog items into active sprint lanes.
- Sprint timing UX:
  - Sprint countdown controls.
  - Pause/resume/reset behaviors.
  - Visual state signaling and urgency indicators.
- Local state architecture:
  - Mock store/state manager for boards, tasks, sprints, filters.
  - Realistic seeded scenarios for demos and testing.

### Behavioral Expectation

- App should feel complete to end users during demos.
- Data resets on refresh by design (no persistence yet).

### Exit Criteria

- Interaction model is stable, intuitive, and polished.
- Frontend data contracts are solidified through mock usage.

---

## Phase 3: Backend and Database Setup

### Objective

After UI is validated, initialize backend infrastructure and persistence foundations in /backend.

### Scope

- Initialize backend folder and Supabase project configuration.
- Define PostgreSQL schema for users, workspaces, projects, sprints, backlog, tasks.
- Create SQL migrations and deterministic seed files.
- Implement authentication foundations and identity model.

### Exit Criteria

- Backend environment is bootstrapped and reproducible.
- Auth and schema are ready for frontend data wiring.

---

## Phase 4: API Integration and Data Wiring

### Objective

Replace all frontend mock data flows with real Supabase-backed reads/writes while preserving the validated UI behavior.

### Scope

- Integrate Server Actions and/or API handlers for data operations.
- Replace mock repositories/providers with live data access layers.
- Enforce Row Level Security (RLS) for all scoped entities.
- Add loading, error, and optimistic update handling over real network calls.

### Exit Criteria

- No production route depends on mock data.
- UI behavior parity with Phase 2 interaction quality is maintained.

---

## Phase 5: Advanced SDLC Features

### Objective

Extend the connected product beyond initial sprint planning to support multiple SDLC frameworks.

### Scope

- Introduce framework modes and workflow rules for:
  - Kanban.
  - Waterfall.
- Add framework-aware views and transitions while preserving a unified UX system.
- Provide migration/adaptation paths for project workflow switching where applicable.

### Exit Criteria

- Choncc supports multiple SDLC paradigms on top of the same core platform.

---

## Phase 6: Deployment and Security

### Objective

Perform final hardening and release the application with reliable operations.

### Scope

- Security hardening across auth, data access, secrets, and transport.
- Deployment workflows for Vercel and/or Docker-based environments.
- CI/CD pipeline setup for build, lint, test, and deployment checks.
- Production readiness checklist, monitoring, and rollback procedures.

### Exit Criteria

- Secure, repeatable production deployment is in place.
- Release workflow is automated and operationally documented.

---

## 4) Governance Rules for This Plan

1. Phase order is strict; phases do not overlap on core scope.
2. Backend work cannot begin before completion criteria for Phase 2 are met.
3. Any exception to UI-first sequencing must be documented in docs and ADR notes.
4. Every phase must update documentation before sign-off.

---

## 5) Why This Plan Fits Solo Development

- Maximizes visible progress quickly.
- Reduces rework caused by premature schema/auth assumptions.
- Keeps product decisions user-experience driven.
- Creates a cleaner handoff from mock contracts to real data contracts.
