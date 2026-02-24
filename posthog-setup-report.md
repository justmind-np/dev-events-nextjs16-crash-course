<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the DevEvent Next.js App Router project. Here's a summary of every change made:

- **`instrumentation-client.ts`** (new file) — Initialises PostHog client-side using the recommended `instrumentation-client.ts` pattern for Next.js 15.3+. Enables exception capture (Error Tracking) and debug mode in development. PostHog is proxied through `/ingest` to improve ad-blocker resilience.
- **`next.config.ts`** — Added reverse-proxy rewrites so all PostHog requests route through `/ingest`, keeping traffic first-party and reducing the chance of being blocked.
- **`components/ExploreBtn.tsx`** — Converted to a `'use client'` component with a named click handler that fires `explore_events_clicked` (the top of the discovery funnel).
- **`components/EventCard.tsx`** — Converted to a `'use client'` component; fires `event_card_clicked` with rich properties (`event_title`, `event_slug`, `event_location`, `event_date`) on every card click.
- **`components/NavBar.tsx`** — Converted to a `'use client'` component; fires `nav_link_clicked` with `label` and `href` properties on every nav link click.
- **`.env.local`** — `NEXT_PUBLIC_POSTHOG_KEY` and `NEXT_PUBLIC_POSTHOG_HOST` added (covered by `.gitignore`).

## Events instrumented

| Event name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the "Explore Events" hero button — top of the discovery funnel | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks an event card to view details — key conversion event | `components/EventCard.tsx` |
| `nav_link_clicked` | User clicks a navigation link (Home, Events, Create Event) | `components/NavBar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behaviour, based on the events we just instrumented:

- 📊 **Dashboard — Analytics basics**: https://us.posthog.com/project/322384/dashboard/1304128
  - [Explore & Event Card Clicks Over Time](https://us.posthog.com/project/322384/insights/gfJxKjqk) — Daily trend of hero button and event card clicks
  - [Event Discovery Funnel](https://us.posthog.com/project/322384/insights/QTnJg9Gu) — Conversion from "Explore Events" click → event card click
  - [Nav Link Clicks by Destination](https://us.posthog.com/project/322384/insights/DC0V78nE) — Which nav links users click most, broken down by label
  - [Most Clicked Events](https://us.posthog.com/project/322384/insights/a8sUmqXy) — Which developer conferences attract the most interest
  - [Weekly Unique Users Exploring & Clicking Events](https://us.posthog.com/project/322384/insights/ZixIQg9Z) — Week-over-week unique user engagement

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
