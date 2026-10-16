# EasyWorkUp Frontend --- Agent Guidelines

These instructions apply to the entire repository.

## Repository context

This repository is the EasyWorkUp frontend.

Current stack:

-   Next.js 14 App Router
-   React 18
-   TypeScript
-   Tailwind CSS 3
-   React Hook Form 7
-   Zod 3
-   TanStack Query 5
-   React Flow 11
-   Orval 7

Use Node.js 22 and pnpm 9.15.9.

The frontend and backend are separate repositories. Do not introduce a
monorepo or shared source package unless explicitly requested.

Backend contracts are consumed through OpenAPI + Orval.

Generated API code under `src/shared/api/generated/` is generated code
and must not be edited manually or committed unless repository policy
explicitly changes.

## Sources of truth

For a task:

-   Jira defines the requested outcome, acceptance criteria,
    dependencies, and allowed file scope.
-   The current repository defines the actual implementation state and
    existing patterns.
-   `CONTRIBUTING.md` defines contribution conventions.
-   `docs/branch-policy.md` defines branch and review policy.
-   `README.md` describes the current project architecture.

If these sources conflict, do not silently choose one. Report the
conflict before making architectural or cross-cutting changes.

## Before editing

Inspect the relevant existing implementation first.

Look for:

-   existing shared UI components;
-   feature patterns;
-   existing types and schemas;
-   related API contracts;
-   reusable utilities;
-   relevant Jira constraints supplied with the task.

Prefer existing repository patterns over introducing new ones.

Do not create architectural layers, global abstractions, routes, or
shared APIs merely because they appear useful.

## Task scope

Stay inside the Jira task's allowed file scope.

One Jira leaf task should normally correspond to one PR.

Do not perform unrelated:

-   refactors;
-   dependency upgrades;
-   repository-wide formatting;
-   renames;
-   cleanup;
-   barrel-file changes.

If unrelated work is needed, report it separately.

## Integrator-owned areas

Treat the following areas as integrator-owned unless the Jira task
explicitly authorizes changing them:

-   `package.json`
-   `pnpm-lock.yaml`
-   TypeScript/build configuration
-   `src/app/globals.css`
-   `src/app/layout.tsx`
-   application routes and `page.tsx`
-   `src/shared/ui/**`
-   `src/shared/api/**`
-   generated API code
-   Orval configuration
-   CI configuration

If a task requires a change in one of these areas but does not authorize
it, stop and report the dependency instead of modifying it.

## UI implementation

Reuse components from the shared UI layer before creating equivalents.

Import shared UI through its public API where available:

``` ts
import { Button, Card } from "@/shared/ui";
```

Do not bypass the shared public API with deep imports unless the
existing codebase already requires it.

Use existing Tailwind design tokens and project styling conventions
instead of introducing arbitrary colors or a parallel design system.

For isolated UI tasks, keep data and actions behind props/callbacks and
local fixtures unless the Jira task explicitly includes model/API
integration.

Do not add fetch, caching, API calls, or React Query logic to a pure UI
task.

Preserve user-entered form state across local UI state changes where
required.

Maintain accessible labels, validation messages, keyboard behavior, and
semantic form controls.

## Dependencies

Do not add or upgrade production dependencies unless the task explicitly
requires it and the change is approved for the task scope.

Check existing platform APIs and installed dependencies first.

## Git workflow

Create working branches from the latest `dev`.

Use repository branch conventions, normally:

``` text
feature/KAN-123-short-name
fix/KAN-123-short-name
```

Feature branches target `dev`.

Do not target `main` from a feature branch.

`main` receives release pull requests from `dev` according to
`docs/branch-policy.md`.

Use Conventional Commits.

Do not force-push shared branches or modify another developer's working
branch.

Do not push, merge, or change Jira state unless explicitly asked.

## Validation

Before declaring implementation complete:

1.  Review the final diff.
2.  Run relevant lint checks.
3.  Run the production build.
4.  Run any real tests relevant to the changed area.
5.  Check the Jira acceptance criteria.

Typical frontend checks:

``` bash
pnpm lint
pnpm build
```

`pnpm test` currently contains a placeholder and must not be presented
as evidence that application tests passed.

For UI tasks, verify the relevant responsive states and negative/error
states required by Jira.

Never claim that a command, test, build, screenshot, or browser check
was completed unless it was actually performed.

## When blocked

Do not invent missing contracts, routes, shared components, policies, or
integration points.

If a prerequisite Jira task is incomplete or a required integration
point is missing, report the blocker and wait for the required contract
or foundation change.

## Final report

When finishing a task, report:

-   what changed;
-   materially changed files;
-   validation commands executed;
-   validation results;
-   assumptions made;
-   unresolved risks or blockers.
