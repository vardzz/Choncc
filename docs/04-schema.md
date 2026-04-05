# Choncc Relational Database Schema (PostgreSQL)

## 1) Schema Goals

This schema is optimized for:

- Multi-tenant workspace isolation.
- High-throughput task and sprint operations.
- Fast board and backlog querying.
- Extensibility for multiple SDLC frameworks.
- Auditability and analytics readiness.

---

## 2) Entity Relationship Overview

Primary entities:

- users
- workspaces
- workspace_members
- projects
- sdlc_framework_types
- project_framework_configs
- sprints
- tasks
- task_tags
- tags
- sprint_participants
- task_dependencies
- activity_events

High-level relationships:

- users <-> workspaces via workspace_members (many-to-many).
- workspace contains many projects.
- project references an active framework type.
- project has many sprints and tasks.
- tasks can be backlog items or sprint items.
- tasks relate to tags and dependencies.

---

## 3) SQL DDL (PostgreSQL)

```sql
-- Enable useful extensions
create extension if not exists pgcrypto;
create extension if not exists citext;

-- Enumerations
create type member_role as enum ('owner', 'project_manager', 'developer', 'viewer');
create type sprint_status as enum ('planned', 'active', 'completed', 'archived');
create type task_type as enum ('story', 'bug', 'chore', 'spike', 'task');
create type task_status as enum (
  'backlog',
  'todo',
  'in_progress',
  'blocked',
  'in_review',
  'done',
  'archived'
);
create type task_priority as enum ('critical', 'high', 'medium', 'low');

-- Users (extends auth identity mapping)
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique,
  email citext not null unique,
  display_name text not null,
  avatar_url text,
  timezone text not null default 'UTC',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Workspaces
create table if not exists workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  created_by uuid not null references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Membership and role assignment
create table if not exists workspace_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role member_role not null,
  is_active boolean not null default true,
  joined_at timestamptz not null default now(),
  unique (workspace_id, user_id)
);

-- SDLC framework catalog
create table if not exists sdlc_framework_types (
  id smallserial primary key,
  code text not null unique,
  name text not null,
  description text,
  is_sprint_based boolean not null default false,
  is_continuous_flow boolean not null default false,
  supports_phase_gates boolean not null default false,
  created_at timestamptz not null default now()
);

-- Projects
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null,
  key text not null,
  description text,
  framework_type_id smallint not null references sdlc_framework_types(id),
  created_by uuid not null references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, key)
);

-- Framework config per project (JSON for extensibility)
create table if not exists project_framework_configs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null unique references projects(id) on delete cascade,
  policy_version integer not null default 1,
  config jsonb not null default '{}'::jsonb,
  updated_by uuid not null references users(id),
  updated_at timestamptz not null default now()
);

-- Sprints
create table if not exists sprints (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  name text not null,
  goal text,
  status sprint_status not null default 'planned',
  starts_at timestamptz,
  ends_at timestamptz,
  capacity_points integer,
  velocity_snapshot numeric(10,2),
  timer_started_at timestamptz,
  timer_paused_at timestamptz,
  timer_total_pause_seconds integer not null default 0,
  created_by uuid not null references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (ends_at is null or starts_at is null or ends_at > starts_at)
);

-- Optional participants per sprint
create table if not exists sprint_participants (
  sprint_id uuid not null references sprints(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  capacity_points integer,
  primary key (sprint_id, user_id)
);

-- Tasks (backlog + active modeled in one table)
create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  sprint_id uuid references sprints(id) on delete set null,
  parent_task_id uuid references tasks(id) on delete set null,

  title text not null,
  description text,
  task_type task_type not null default 'task',
  status task_status not null default 'backlog',
  priority task_priority not null default 'medium',

  story_points numeric(6,2),
  estimate_minutes integer,
  remaining_minutes integer,

  assignee_user_id uuid references users(id) on delete set null,
  reporter_user_id uuid not null references users(id),

  backlog_rank numeric(18,6),
  board_column text,
  board_position numeric(18,6),

  due_at timestamptz,
  completed_at timestamptz,

  metadata jsonb not null default '{}'::jsonb,

  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Tag catalog (tags/genres)
create table if not exists tags (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null,
  color text,
  description text,
  unique (workspace_id, name)
);

-- Many-to-many task tag mapping
create table if not exists task_tags (
  task_id uuid not null references tasks(id) on delete cascade,
  tag_id uuid not null references tags(id) on delete cascade,
  primary key (task_id, tag_id)
);

-- Task dependency graph
create table if not exists task_dependencies (
  task_id uuid not null references tasks(id) on delete cascade,
  depends_on_task_id uuid not null references tasks(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (task_id, depends_on_task_id),
  check (task_id <> depends_on_task_id)
);

-- Activity events for audit and analytics
create table if not exists activity_events (
  id bigserial primary key,
  workspace_id uuid not null references workspaces(id) on delete cascade,
  project_id uuid references projects(id) on delete cascade,
  sprint_id uuid references sprints(id) on delete set null,
  task_id uuid references tasks(id) on delete set null,
  actor_user_id uuid references users(id) on delete set null,
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
```

---

## 4) Indexing Strategy for High-Speed Queries

```sql
-- Membership lookups
create index if not exists idx_workspace_members_workspace_user
  on workspace_members (workspace_id, user_id);
create index if not exists idx_workspace_members_user
  on workspace_members (user_id) where is_active = true;

-- Project scope
create index if not exists idx_projects_workspace
  on projects (workspace_id);

-- Sprint boards and timelines
create index if not exists idx_sprints_project_status
  on sprints (project_id, status);
create index if not exists idx_sprints_project_dates
  on sprints (project_id, starts_at desc, ends_at desc);

-- Task board/backlog querying
create index if not exists idx_tasks_project_status
  on tasks (project_id, status);
create index if not exists idx_tasks_project_sprint_status
  on tasks (project_id, sprint_id, status);
create index if not exists idx_tasks_project_backlog_rank
  on tasks (project_id, backlog_rank)
  where status = 'backlog';
create index if not exists idx_tasks_sprint_column_position
  on tasks (sprint_id, board_column, board_position)
  where sprint_id is not null;
create index if not exists idx_tasks_assignee
  on tasks (assignee_user_id, status);
create index if not exists idx_tasks_due_at
  on tasks (due_at)
  where due_at is not null;

-- JSON metadata search
create index if not exists idx_tasks_metadata_gin
  on tasks using gin (metadata);

-- Event stream
create index if not exists idx_activity_events_workspace_time
  on activity_events (workspace_id, created_at desc);
create index if not exists idx_activity_events_project_time
  on activity_events (project_id, created_at desc);
create index if not exists idx_activity_events_task_time
  on activity_events (task_id, created_at desc);
```

---

## 5) Query Optimization Notes

- Use partial indexes for status-specific heavy reads (backlog and active board).
- Keep board ordering fields numeric to support low-cost insertion between items.
- Use optimistic concurrency via tasks.version to prevent reorder collisions.
- Prefer keyset pagination for activity and large backlog lists.
- Introduce materialized views later for velocity and cycle-time analytics.

---

## 6) Normalization vs Flexibility

- Core workflow entities are normalized for consistency and integrity.
- framework-specific behavior lives in project_framework_configs.config JSONB.
- task metadata JSONB supports controlled extensibility without schema churn.

This hybrid design supports both strict operational integrity and framework adaptability.

---

## 7) Suggested Seed Data for Framework Types

```sql
insert into sdlc_framework_types (code, name, description, is_sprint_based, is_continuous_flow, supports_phase_gates)
values
  ('agile_scrum', 'Agile Scrum', 'Sprint-based iterative framework', true, false, false),
  ('kanban', 'Kanban', 'Continuous flow with WIP constraints', false, true, false),
  ('waterfall', 'Waterfall', 'Sequential phase-gate lifecycle', false, false, true),
  ('v_model', 'V-Model', 'Verification/validation aligned lifecycle', false, false, true)
on conflict (code) do nothing;
```

---

## 8) Migration and Evolution Guidance

- Keep one migration per logical schema change.
- Never edit applied migrations in shared environments.
- Pair schema migrations with backfill scripts when introducing non-null constraints.
- Add and validate indexes before high-traffic release windows.
- Track query plans for board and backlog endpoints on realistic data volumes.
