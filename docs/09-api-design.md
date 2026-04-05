# Choncc API Design Strategy (Next.js App Router)

## 1) API Design Goals

Choncc API architecture should maximize:

- Developer productivity.
- Security and permission correctness.
- Consistency across server and client interactions.
- Long-term compatibility as SDLC capabilities grow.

---

## 2) Interaction Model: Server Actions vs API Routes vs Client Fetching

## 2.1 Server Actions

Use for:

- Authenticated mutations tightly coupled to UI workflows.
- Form submissions and board interactions.
- Actions where route-level public contract is not required.

Examples:

- Create sprint.
- Move task in board.
- Update backlog priority.

Benefits:

- Less boilerplate.
- Co-located with UI use cases.
- Easier access to server-only secrets and auth context.

Constraints:

- Keep action payloads validated.
- Avoid embedding large business logic directly in component files; delegate to feature/server modules.

## 2.2 Route Handlers (API Routes)

Use for:

- Public or semi-public API contracts.
- Webhooks and integration endpoints.
- Non-UI clients.
- Bulk operations requiring explicit HTTP semantics.

Examples:

- GET /api/v1/projects/:projectId/analytics
- POST /api/v1/integrations/webhooks/supabase

Benefits:

- Explicit request/response contracts.
- Better versioning and integration stability.

## 2.3 Client-Side Data Fetching

Use for:

- Non-sensitive, interaction-heavy reads requiring fast local refresh.
- Live board updates with cache-aware refresh behavior.

Examples:

- Polling or subscription-backed board lane counts.
- Secondary panel metadata refresh.

Guidance:

- Prefer server rendering for initial critical data.
- Use client fetching for interactive deltas and local responsiveness.

---

## 3) API Versioning and Namespacing

Pattern:

- /api/v1/... for all externally callable route handlers.

Rules:

- Introduce v2 only for breaking contract changes.
- Keep deprecated endpoints with sunset policy and documented timelines.
- Include changelog entries for contract changes.

---

## 4) Resource Naming Conventions

Conventions:

- Use plural nouns for collections.
- Use kebab-case for multi-word URL segments.
- Use IDs as path parameters.
- Avoid verbs in route paths; represent action via HTTP method.

Examples:

- GET /api/v1/workspaces
- POST /api/v1/workspaces
- GET /api/v1/workspaces/:workspaceId/projects
- PATCH /api/v1/tasks/:taskId
- POST /api/v1/sprints/:sprintId/close

Note: Action endpoints (such as close sprint) are acceptable when domain action does not map cleanly to pure CRUD.

---

## 5) Recommended Route Catalog (Initial)

## Workspace and Project

- GET /api/v1/workspaces
- POST /api/v1/workspaces
- GET /api/v1/workspaces/:workspaceId
- PATCH /api/v1/workspaces/:workspaceId
- GET /api/v1/workspaces/:workspaceId/projects
- POST /api/v1/workspaces/:workspaceId/projects

## Sprint

- GET /api/v1/projects/:projectId/sprints
- POST /api/v1/projects/:projectId/sprints
- PATCH /api/v1/sprints/:sprintId
- POST /api/v1/sprints/:sprintId/start
- POST /api/v1/sprints/:sprintId/complete

## Task and Backlog

- GET /api/v1/projects/:projectId/tasks
- POST /api/v1/projects/:projectId/tasks
- PATCH /api/v1/tasks/:taskId
- POST /api/v1/tasks/:taskId/move
- POST /api/v1/tasks/:taskId/assign
- POST /api/v1/tasks/bulk-update

## Analytics and Export

- GET /api/v1/projects/:projectId/analytics/velocity
- GET /api/v1/projects/:projectId/analytics/throughput
- POST /api/v1/projects/:projectId/exports

---

## 6) Server Action Naming Conventions

Use clear imperative names and colocate in feature modules:

- createWorkspaceAction
- createSprintAction
- moveTaskAction
- reorderBacklogAction
- startSprintTimerAction

File naming examples:

- create-sprint.action.ts
- move-task.action.ts

Each action should:

- Validate input schema.
- Validate auth and permissions.
- Call domain service.
- Return typed result with machine-readable error codes.

---

## 7) Request/Response Contract Standards

Request standards:

- Use JSON body for POST/PATCH.
- Enforce strict schema validation.
- Reject unknown or malformed fields.

Response standards:

- Success envelope:

```json
{
  "data": {},
  "meta": {}
}
```

- Error envelope:

```json
{
  "error": {
    "code": "TASK_CONFLICT",
    "message": "Task version conflict detected",
    "details": {}
  }
}
```

Status code policy:

- 200/201 success.
- 400 validation errors.
- 401 unauthenticated.
- 403 unauthorized.
- 404 not found.
- 409 conflict (optimistic concurrency).
- 429 rate limit.
- 500 server error.

---

## 8) Concurrency and Consistency Strategy

For drag-and-drop and ordering operations:

- Include version field in mutation payloads.
- Reject stale updates with 409 conflict.
- Return latest entity snapshot for client reconciliation.

For bulk operations:

- Prefer transactional boundaries where integrity requires all-or-nothing behavior.
- Return partial failure details only when explicitly allowing partial success.

---

## 9) Security Requirements for API Surfaces

- Enforce auth and tenant checks at entry point.
- Validate role permissions for every mutation.
- Apply rate limits to mutation and export endpoints.
- Sanitize user-generated text fields.
- Log security-relevant denials with correlation metadata.

---

## 10) Observability and API Operations

- Include request IDs in logs and responses.
- Record latency for key endpoints.
- Track error code distributions.
- Maintain endpoint-level SLOs for critical workflows.

---

## 11) Documentation and Contract Governance

- Maintain endpoint docs with examples and error cases.
- Add contract tests for route handlers.
- Require review for any API breaking change.
- Keep a versioned API changelog in docs.

This ensures Choncc APIs remain reliable while evolving with product complexity.
