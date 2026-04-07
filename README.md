# CHONCC

<div align="center">
<pre>

```
 ██████╗  ██╗  ██╗  ██████╗  ███╗   ██╗  ██████╗   ██████╗
██╔════╝  ██║  ██║ ██╔═══██╗ ████╗  ██║ ██╔════╝  ██╔════╝
██║       ███████║ ██║   ██║ ██╔██╗ ██║ ██║       ██║
██║       ██╔══██║ ██║   ██║ ██║╚██╗██║ ██║       ██║
╚██████╗  ██║  ██║ ╚██████╔╝ ██║ ╚████║ ╚██████╗  ╚██████╗
 ╚═════╝  ╚═╝  ╚═╝  ╚═════╝  ╚═╝  ╚═══╝  ╚═════╝   ╚═════╝
```

</pre>
</div>

CHONCC is a privacy-first, Web3-powered SDLC workspace focused on deep focus execution.
It combines backlog planning, sprint operations, and board flow into a single product surface.

## Why Choncc

- Built for focused delivery, not noisy project management.
- Multi-workspace architecture with role-aware access control.
- Three-pane UI designed for fast context switching with minimal friction.
- Sprint and backlog workflows with drag-and-drop execution.
- Strong security posture via Supabase Auth plus Row Level Security.

## Core Capabilities

- Workspace and project management
- Three-pane shell (navigation, active sprint board, backlog)
- Backlog prioritization, estimates, tags, and dependencies
- Sprint lifecycle management (planned, active, completed, archived)
- Drag-and-drop workflow engine
- Sprint timer and capacity awareness
- Role-based access control (Project Manager, Developer)
- Activity and audit trail foundations

## Technology Stack

- Next.js App Router + React + TypeScript
- Tailwind CSS + design tokens
- Supabase (PostgreSQL, Auth, RLS)
- Vercel deployment with Docker parity path
- GitHub Actions CI/CD
- Observability path: Sentry + OpenTelemetry-compatible telemetry

## Repository Layout

```text
docs/       Product, architecture, security, API, testing, and ADRs
frontend/   Next.js application (App Router, feature modules, state, hooks)
README.md   Root project overview
```

## Local Development

### 1. Enter the frontend app

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Then open http://localhost:3000.

## Documentation Index

- docs/00-phase0-signoff.md
- docs/01-phases.md
- docs/02-structure.md
- docs/03-techstack.md
- docs/04-schema.md
- docs/05-agents.md
- docs/06-features.md
- docs/07-security.md
- docs/08-deployment.md
- docs/09-api-design.md
- docs/10-testing.md
- docs/11-prd-baseline.md
- docs/12-engineering-standards.md

## Status

Choncc is in active build mode.
Current direction emphasizes premium UX, deep focus productivity, and production-grade architecture.
