# Choncc Project Structure Scaffold (Visual Tree)

## 1) Purpose

This document gives you a fully finished, visual scaffold using tree lines so you can quickly see which folders and files are nested under each parent.

Core structure rule:

- Organize by domain first (feature folders), then by technical role (components, server, validators, tests).

---

## 2) Full Project Scaffold (Production-Ready)

```txt
choncc/
|-- .editorconfig
|-- .env.example
|-- .eslintrc.cjs
|-- .gitignore
|-- .prettierignore
|-- .prettierrc
|-- LICENSE
|-- Makefile
|-- README.md
|-- next-env.d.ts
|-- next.config.ts
|-- package.json
|-- postcss.config.cjs
|-- tailwind.config.ts
|-- tsconfig.json
|-- middleware.ts
|
|-- app/
|   |-- globals.css
|   |-- layout.tsx
|   |-- not-found.tsx
|   |-- global-error.tsx
|   |
|   |-- (marketing)/
|   |   |-- layout.tsx
|   |   `-- page.tsx
|   |
|   |-- (auth)/
|   |   |-- layout.tsx
|   |   |-- login/
|   |   |   `-- page.tsx
|   |   `-- signup/
|   |       `-- page.tsx
|   |
|   |-- (app)/
|   |   |-- layout.tsx
|   |   |-- page.tsx
|   |   |
|   |   |-- workspace/
|   |   |   `-- [workspaceId]/
|   |   |       |-- layout.tsx
|   |   |       |-- page.tsx
|   |   |       |-- board/
|   |   |       |   `-- page.tsx
|   |   |       |-- backlog/
|   |   |       |   `-- page.tsx
|   |   |       |-- analytics/
|   |   |       |   `-- page.tsx
|   |   |       `-- settings/
|   |   |           `-- page.tsx
|   |   |
|   |   `-- api/
|   |       `-- v1/
|   |           |-- health/
|   |           |   `-- route.ts
|   |           |-- me/
|   |           |   `-- route.ts
|   |           |-- workspaces/
|   |           |   |-- route.ts
|   |           |   `-- [workspaceId]/
|   |           |       |-- route.ts
|   |           |       `-- projects/
|   |           |           `-- route.ts
|   |           |-- projects/
|   |           |   `-- [projectId]/
|   |           |       |-- route.ts
|   |           |       |-- sprints/
|   |           |       |   `-- route.ts
|   |           |       |-- tasks/
|   |           |       |   `-- route.ts
|   |           |       |-- analytics/
|   |           |       |   |-- velocity/
|   |           |       |   |   `-- route.ts
|   |           |       |   `-- throughput/
|   |           |       |       `-- route.ts
|   |           |       `-- exports/
|   |           |           `-- route.ts
|   |           |-- sprints/
|   |           |   `-- [sprintId]/
|   |           |       |-- route.ts
|   |           |       |-- start/
|   |           |       |   `-- route.ts
|   |           |       `-- complete/
|   |           |           `-- route.ts
|   |           `-- tasks/
|   |               |-- bulk-update/
|   |               |   `-- route.ts
|   |               `-- [taskId]/
|   |                   |-- route.ts
|   |                   |-- move/
|   |                   |   `-- route.ts
|   |                   `-- assign/
|   |                       `-- route.ts
|   |
|   `-- actions/
|       |-- workspace/
|       |   |-- create-workspace.action.ts
|       |   `-- update-workspace.action.ts
|       |-- sprint/
|       |   |-- create-sprint.action.ts
|       |   |-- start-sprint.action.ts
|       |   `-- complete-sprint.action.ts
|       `-- task/
|           |-- create-task.action.ts
|           |-- move-task.action.ts
|           |-- reorder-backlog.action.ts
|           `-- assign-task.action.ts
|
|-- components/
|   |-- ui/
|   |   |-- badge.tsx
|   |   |-- button.tsx
|   |   |-- card.tsx
|   |   |-- dialog.tsx
|   |   |-- dropdown-menu.tsx
|   |   |-- input.tsx
|   |   |-- progress.tsx
|   |   |-- select.tsx
|   |   |-- tabs.tsx
|   |   |-- textarea.tsx
|   |   `-- tooltip.tsx
|   |-- layout/
|   |   |-- three-pane-shell.tsx
|   |   |-- workspace-nav-pane.tsx
|   |   |-- sprint-board-pane.tsx
|   |   `-- backlog-pane.tsx
|   `-- feedback/
|       |-- empty-state.tsx
|       |-- error-state.tsx
|       `-- loading-state.tsx
|
|-- features/
|   |-- auth/
|   |   |-- components/
|   |   |   |-- login-form.tsx
|   |   |   `-- signup-form.tsx
|   |   |-- server/
|   |   |   |-- auth.service.ts
|   |   |   `-- session.service.ts
|   |   |-- guards/
|   |   |   `-- require-auth.ts
|   |   |-- validators/
|   |   |   `-- auth.schema.ts
|   |   `-- types.ts
|   |
|   |-- workspace/
|   |   |-- components/
|   |   |   |-- workspace-switcher.tsx
|   |   |   `-- project-list.tsx
|   |   |-- hooks/
|   |   |   `-- use-workspace.ts
|   |   |-- server/
|   |   |   |-- workspace.repository.ts
|   |   |   `-- workspace.service.ts
|   |   |-- validators/
|   |   |   `-- workspace.schema.ts
|   |   |-- mappers/
|   |   |   `-- workspace.mapper.ts
|   |   `-- types.ts
|   |
|   |-- sprint/
|   |   |-- components/
|   |   |   |-- sprint-header.tsx
|   |   |   |-- sprint-capacity-card.tsx
|   |   |   `-- sprint-timer.tsx
|   |   |-- dnd/
|   |   |   |-- board-dnd-context.tsx
|   |   |   |-- task-sortable-item.tsx
|   |   |   `-- dnd-helpers.ts
|   |   |-- timers/
|   |   |   `-- sprint-timer.machine.ts
|   |   |-- hooks/
|   |   |   `-- use-sprint-board.ts
|   |   |-- server/
|   |   |   |-- sprint.repository.ts
|   |   |   |-- sprint.service.ts
|   |   |   `-- sprint-policy.service.ts
|   |   |-- validators/
|   |   |   `-- sprint.schema.ts
|   |   `-- types.ts
|   |
|   |-- backlog/
|   |   |-- components/
|   |   |   |-- backlog-list.tsx
|   |   |   |-- backlog-item-row.tsx
|   |   |   `-- backlog-filters.tsx
|   |   |-- filters/
|   |   |   `-- backlog-filter-builder.ts
|   |   |-- hooks/
|   |   |   `-- use-backlog.ts
|   |   |-- server/
|   |   |   |-- backlog.repository.ts
|   |   |   `-- backlog.service.ts
|   |   |-- validators/
|   |   |   `-- backlog.schema.ts
|   |   `-- types.ts
|   |
|   |-- framework/
|   |   |-- components/
|   |   |   `-- framework-switcher.tsx
|   |   |-- policies/
|   |   |   |-- agile.policy.ts
|   |   |   |-- kanban.policy.ts
|   |   |   |-- waterfall.policy.ts
|   |   |   `-- vmodel.policy.ts
|   |   |-- server/
|   |   |   `-- framework.service.ts
|   |   |-- validators/
|   |   |   `-- framework.schema.ts
|   |   `-- types.ts
|   |
|   `-- analytics/
|       |-- components/
|       |   |-- velocity-chart.tsx
|       |   |-- throughput-chart.tsx
|       |   `-- cycle-time-chart.tsx
|       |-- server/
|       |   |-- analytics.repository.ts
|       |   `-- analytics.service.ts
|       |-- serializers/
|       |   `-- analytics.serializer.ts
|       `-- types.ts
|
|-- hooks/
|   |-- use-debounced-value.ts
|   |-- use-keyboard-shortcuts.ts
|   |-- use-local-storage.ts
|   `-- use-media-query.ts
|
|-- lib/
|   |-- auth/
|   |   |-- permissions.ts
|   |   `-- session.ts
|   |-- cache/
|   |   |-- keys.ts
|   |   `-- revalidate.ts
|   |-- db/
|   |   |-- client.ts
|   |   |-- pagination.ts
|   |   `-- query-helpers.ts
|   |-- observability/
|   |   |-- logger.ts
|   |   |-- metrics.ts
|   |   `-- tracing.ts
|   |-- security/
|   |   |-- csrf.ts
|   |   |-- rate-limit.ts
|   |   `-- sanitize.ts
|   `-- utils/
|       |-- date.ts
|       |-- id.ts
|       |-- math.ts
|       `-- objects.ts
|
|-- public/
|   |-- fonts/
|   |   |-- geist-mono.woff2
|   |   `-- geist-sans.woff2
|   |-- icons/
|   |   |-- backlog.svg
|   |   |-- board.svg
|   |   `-- timer.svg
|   `-- images/
|       |-- auth-hero.webp
|       `-- og-cover.png
|
|-- styles/
|   |-- tokens.css
|   |-- utilities.css
|   `-- animations.css
|
|-- supabase/
|   |-- config.toml
|   |-- migrations/
|   |   |-- 0001_init.sql
|   |   |-- 0002_rls_policies.sql
|   |   `-- 0003_indexes.sql
|   |-- seed/
|   |   |-- dev.seed.sql
|   |   `-- staging.seed.sql
|   |-- policies/
|   |   |-- workspace_members.sql
|   |   |-- projects.sql
|   |   |-- sprints.sql
|   |   `-- tasks.sql
|   `-- functions/
|       `-- validate-membership.sql
|
|-- scripts/
|   |-- check-env.ts
|   |-- generate-db-types.ts
|   |-- seed-dev.ts
|   `-- smoke-test.ts
|
|-- tests/
|   |-- unit/
|   |   |-- features/
|   |   |   |-- sprint/
|   |   |   |   `-- sprint-policy.test.ts
|   |   |   `-- backlog/
|   |   |       `-- reorder.test.ts
|   |   `-- lib/
|   |       `-- security.test.ts
|   |
|   |-- integration/
|   |   |-- api/
|   |   |   |-- workspaces.route.test.ts
|   |   |   `-- tasks.route.test.ts
|   |   `-- db/
|   |       `-- rls-policies.test.ts
|   |
|   |-- e2e/
|   |   |-- auth-flow.spec.ts
|   |   |-- sprint-flow.spec.ts
|   |   `-- backlog-dnd.spec.ts
|   |
|   |-- fixtures/
|   |   |-- small-team-scrum.json
|   |   `-- overloaded-sprint.json
|   `-- factories/
|       `-- task.factory.ts
|
|-- types/
|   |-- api.ts
|   |-- common.ts
|   |-- database.ts
|   `-- events.ts
|
|-- .github/
|   `-- workflows/
|       |-- ci.yml
|       |-- deploy-staging.yml
|       `-- deploy-production.yml
|
`-- docs/
    |-- 01-phases.md
    |-- 02-structure.md
    |-- 03-techstack.md
    |-- 04-schema.md
    |-- 05-agents.md
    |-- 06-features.md
    |-- 07-security.md
    |-- 08-deployment.md
    |-- 09-api-design.md
    `-- 10-testing.md
```

---

## 3) Folder Intent (Quick Reference)

- app: routing, layouts, page composition, API route handlers, server actions.
- features: domain-first business modules (auth, workspace, sprint, backlog, framework, analytics).
- components: reusable design system and cross-domain layout/feedback pieces.
- lib: cross-domain infrastructure and utility logic.
- supabase: migrations, RLS policies, seeds, and SQL helpers.
- tests: unit, integration, and end-to-end quality layers.
- scripts: operational scripts for env checks, db types, seeds, and smoke tests.

---

## 4) Naming and Conventions

- File names: kebab-case.
- Component names: PascalCase.
- Route handlers: route.ts.
- Server actions: name.action.ts.
- SQL entities: snake_case.

Examples:

- create-sprint.action.ts
- sprint-policy.service.ts
- sprint-capacity-card.tsx

---

## 5) Why This Scaffold Works for Choncc

- Makes folder ownership obvious at a glance.
- Preserves fast solo development while staying enterprise-scalable.
- Keeps SDLC-framework expansion clean through dedicated feature modules.
- Reduces refactor risk by centralizing shared infra under lib and domain logic under features.
