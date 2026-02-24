# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**DevEvent** — a Next.js 16 App Router application for discovering developer events (hackathons, meetups, conferences). Uses React 19, TypeScript, Tailwind CSS v4, and shadcn/ui (new-york style). PostHog is integrated for product analytics.

## Commands

- `npm run dev` — start development server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — run ESLint (flat config, `eslint.config.mjs`)

No test framework is currently configured.

## Architecture

### App Router (Next.js 16)

Single-page app using the App Router. All routes live under `app/`. Currently only the root route (`app/page.tsx`) exists, rendering a list of event cards from static data.

- `app/layout.tsx` — Root layout with Google Fonts (Schibsted Grotesk, Martian Mono), a global `LightRays` WebGL background (via `ogl`), and `NavBar`.
- `app/page.tsx` — Server component. Renders `ExploreBtn` and a list of `EventCard` components from `lib/constants.ts`.

### Components

- `NavBar`, `ExploreBtn`, `EventCard` — all `'use client'` components that import `posthog-js` directly to capture analytics events in click handlers.
- `LightRays` — WebGL shader-based animated background effect using `ogl`. Large, self-contained component with its own CSS file.

### PostHog Analytics

PostHog is initialized **once** in `instrumentation-client.ts` (the Next.js 15.3+ client instrumentation hook). Do **not** add a `PostHogProvider` or any other client-side initialization — this is the only initialization point.

- Events are proxied through Next.js rewrites (`/ingest/*` → `us.i.posthog.com`) configured in `next.config.ts` to avoid ad-blockers.
- The API key is read from `NEXT_PUBLIC_POSTHOG_KEY` in `.env.local`.
- Capture calls are made by importing `posthog` from `posthog-js` directly in client components' event handlers.

### Styling

- Tailwind CSS v4 with `@tailwindcss/postcss` plugin (not the older `tailwindcss` PostCSS plugin).
- `tailwindcss-animate` plugin for animations.
- shadcn/ui configured via `components.json`; UI primitives go in `components/ui/`, utilities in `lib/utils.ts` (the `cn()` helper).
- Path alias: `@/*` maps to the project root.

### Data

Event data is hardcoded in `lib/constants.ts` (no database or API). Adding a backend/API is a likely next step.
