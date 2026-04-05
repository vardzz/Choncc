# Choncc v1 Product Requirements Baseline (Phase 0)

## 1) Scope Boundary for v1

In scope:

- Authentication and user profile initialization.
- Workspace and project management.
- 3-pane workspace shell (left navigation, center sprint board, right backlog).
- Backlog management with priority, estimation, tags, dependencies.
- Sprint lifecycle: planned -> active -> completed -> archived.
- Drag and drop between backlog and sprint board with optimistic updates.
- Basic capacity indicators and sprint timer.
- RBAC for Project Manager and Developer.
- Activity and audit events.

Out of scope for v1:

- Full multi-framework runtime switching in production.
- Advanced AI planning assistants.
- External ecosystem integrations and public webhook platform.
- Enterprise governance controls beyond baseline RBAC and audit.

## 2) Target Users and Personas

### Persona A: Solo Builder

- Profile: Independent developer managing one or more personal projects.
- Primary goal: Plan and execute short sprints with minimal overhead.
- Main pain points:
  - Context switching between notes, tasks, and sprint board.
  - Losing prioritization signal as backlog grows.
  - Difficulty preserving focus during execution.

### Persona B: Small Team Lead

- Profile: Project Manager or lead engineer guiding a 2-8 person team.
- Primary goal: Keep sprint planning, assignment, and delivery transparent.
- Main pain points:
  - Inconsistent update cadence by contributors.
  - Weak visibility into capacity and workload imbalance.
  - Coordination friction across board, backlog, and progress views.

### Persona C: Team Developer

- Profile: Engineer working inside sprint commitments.
- Primary goal: Understand priorities and update progress quickly.
- Main pain points:
  - Ambiguous priorities.
  - Too many clicks to update status.
  - Missing history for why tasks changed.

## 3) Core Workflows

1. Workspace setup

- User signs in, creates workspace, creates project.

2. Backlog grooming

- User adds tasks, estimates effort, sets priority and dependencies.

3. Sprint planning

- User creates sprint, selects candidate backlog items, validates capacity.

4. Sprint execution

- Team moves tasks across columns, updates assignments, tracks timer signals.

5. Sprint close

- User completes sprint, captures carry-over, retains auditable event history.

## 4) Primary User Stories

1. As a solo builder, I want to create and prioritize backlog tasks quickly so I can plan my sprint without context loss.
2. As a project manager, I want to move tasks from backlog into a sprint and see capacity warnings so I can prevent overcommit.
3. As a developer, I want to update task status from the board with low friction so I can keep progress accurate.
4. As a project manager, I want role-based permissions so only authorized users can control sprint lifecycle actions.
5. As a team lead, I want an activity history for task and sprint changes so I can trace decisions and reduce confusion.

## 5) Non-Functional Baseline

- Performance: interaction-heavy shell actions should remain smooth in typical team workloads.
- Accessibility: keyboard navigation and clear focus handling across core flows.
- Security: tenant isolation, role authorization, validated mutations, and auditable critical actions.

## 6) Acceptance Definition for Phase 1 Entry

- Scope above is approved and frozen for Phase 1 and Phase 2 execution.
- Out-of-scope items are explicitly deferred.
- Personas and workflows are accepted as design and development references.
