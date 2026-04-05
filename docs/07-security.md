# Choncc Security Manifesto

## 1) Security Principles

Choncc security strategy follows layered defense:

- Prevent by design.
- Enforce by default.
- Verify continuously.
- Limit blast radius.
- Audit all critical actions.

Security priorities:

1. Tenant isolation and authorization correctness.
2. Data integrity and confidentiality.
3. Protection against common web exploits.
4. Secure operations and incident readiness.

---

## 2) Threat Model Highlights

Primary threat classes:

- Cross-Site Scripting (XSS).
- Cross-Site Request Forgery (CSRF).
- SQL Injection and unsafe query construction.
- Broken access control / tenant leakage.
- Session hijacking and token misuse.
- Abuse via automated request floods.
- Secrets exposure through logs/build/runtime leakage.

---

## 3) XSS Prevention Strategy

Controls:

- Use React/Next.js default escaping behavior everywhere.
- Forbid unsafe HTML rendering unless sanitized.
- If rich text is required, sanitize with a strict allowlist.
- Encode untrusted content in any non-React rendering path.

CSP and browser controls:

- Set strict Content Security Policy.
- Avoid inline scripts where possible.
- Restrict script-src to trusted origins.
- Add X-Content-Type-Options: nosniff.

Implementation notes:

- Centralize sanitize helper and make it mandatory for rich text inputs.
- Add tests for payloads containing script tags and event attributes.

---

## 4) CSRF Prevention Strategy

For authenticated mutations:

- Prefer same-site strict or lax cookies depending on flow requirements.
- Implement anti-CSRF token checks for mutation endpoints where applicable.
- Verify origin and referer headers for sensitive routes.
- Disallow cross-origin credentials unless explicitly needed.

In Next.js:

- Validate request origin inside Server Actions and route handlers handling state changes.
- Reject state-changing requests that fail CSRF/origin checks with clear audit logs.

---

## 5) SQL Injection Prevention Strategy

- Never interpolate user input into SQL strings.
- Use parameterized queries or trusted query builders.
- Restrict dynamic query parts to allowlisted columns and operators.
- Validate and coerce input types before data access.

Supabase-specific guidance:

- Use typed client queries where possible.
- Keep high-risk query logic inside controlled server-side modules.

---

## 6) Authentication and Session Security

Requirements:

- Use secure, httpOnly, sameSite cookies for session tokens.
- Set short-lived access tokens and controlled refresh flow.
- Enforce re-auth for high-risk account actions.
- Support session revocation and logout-all-sessions where feasible.

Operational controls:

- Detect anomalous session behavior (optional advanced).
- Record session creation and critical auth events.

---

## 7) Authorization and Row Level Security (RLS)

Core rule:

- Authorization must be enforced both in application logic and database policies.

RLS policy design:

- Workspace-scoped access only for members.
- Role-constrained mutation rights.
- Deny by default.

Example RLS pattern (conceptual):

```sql
-- Pseudo-pattern for project read access
create policy project_read_policy on projects
for select
using (
  exists (
    select 1
    from workspace_members wm
    where wm.workspace_id = projects.workspace_id
      and wm.user_id = auth.uid()
      and wm.is_active = true
  )
);
```

Best practices:

- Keep policies explicit and reviewed in source control.
- Add policy tests for each role and tenant boundary.
- Avoid bypass pathways through overly permissive service-role usage.

---

## 8) Next.js Middleware and Route Security

Middleware responsibilities:

- Enforce authenticated access for protected route groups.
- Redirect unauthorized users early.
- Add request context markers for logging and tracing.

Route handler and Server Action rules:

- Validate identity and permission at entry point.
- Validate input schema before processing.
- Return minimal error details to clients.
- Log security-relevant failures with request correlation IDs.

---

## 9) Rate Limiting and Abuse Protection

Apply rate limits on:

- Auth endpoints.
- Task/sprint mutation endpoints.
- Export/report generation endpoints.
- Public webhook endpoints.

Recommended model:

- Sliding window or token bucket.
- Per-IP + per-user limits for authenticated surfaces.
- Stricter limits on expensive operations.

Response behavior:

- Return 429 with retry hint.
- Emit structured abuse logs for monitoring.

---

## 10) Secure Input Validation and Output Handling

- Use centralized schema validation for all external inputs.
- Reject unknown fields where practical.
- Normalize input types and lengths.
- Enforce server-side validation regardless of client checks.
- Escape/encode output when rendering in custom contexts.

---

## 11) Secrets and Environment Variable Protection

Rules:

- Never commit secrets.
- Store secrets in platform-managed secret stores.
- Separate secrets per environment (dev, staging, prod).
- Rotate secrets periodically and after incidents.

Runtime safety:

- Avoid printing env vars in logs.
- Restrict which env vars are exposed to client bundles.
- Fail fast if critical env vars are missing at startup.

---

## 12) Dependency and Supply Chain Security

- Enable automated dependency vulnerability scanning.
- Pin or range-constrain critical packages responsibly.
- Review transitive dependency risk for high-impact libraries.
- Use lockfiles and deterministic installs in CI.

---

## 13) Logging, Monitoring, and Incident Response

Logging standards:

- Structured logs with severity and correlation IDs.
- Security events tagged distinctly.
- No sensitive payload leakage in logs.

Monitoring:

- Alert on authentication anomalies, elevated 4xx/5xx rates, and suspicious mutation spikes.
- Track RLS denial anomalies to detect policy drift.

Incident response minimum:

- Detection -> triage -> containment -> eradication -> recovery -> postmortem.
- Time-bound communication and action ownership.

---

## 14) Security Testing Program

Required checks:

- Static analysis and lint security rules in CI.
- Dependency vulnerability scanning.
- Integration tests for auth + RLS policy enforcement.
- Targeted penetration-style test scenarios for high-risk endpoints.

Example test categories:

- Unauthorized cross-workspace data access attempts.
- CSRF mutation attempts from foreign origins.
- XSS payload injection in task descriptions/comments.
- SQL injection payloads against filter/search inputs.

---

## 15) Production Security Checklist

Before each production release:

- RLS policy tests pass.
- Route auth guard tests pass.
- Security headers verified.
- Rate limiting enabled and validated.
- Secrets inventory reviewed.
- Dependency scan critical issues resolved or accepted with documented risk.
- Incident contacts and runbooks confirmed current.

This checklist is mandatory for go-live and major releases.
