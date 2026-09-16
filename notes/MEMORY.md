# MEMORY.md

## User preferences
- Communicates in Chinese
- Values offline-capable versions of the app
- Cares about publishing quality: requested SEO audit fixes (meta descriptions, H1s, OG tags, canonical URLs, title ≤60 chars, description ≤160 chars)

## Tech stack
- Astro project (pages-based routing in `src/pages/`)
- Tailwind CSS for styling
- Uses uppercase tracking-wide styled badges/pills for tags (`text-sm font-semibold uppercase tracking-wide text-primary`)
- Primary color class used: `text-primary`
- Has offline HTML variant in `public/` directory

## Project structure
- Key page files: `src/pages/index.astro`, `src/pages/about.astro`, `src/pages/eligibility.astro`, `src/pages/camps.astro`, `src/pages/find-help.astro`, `src/pages/schemes.astro`, `src/pages/schemes/[id].astro`
- Layout: `src/layouts/Base.astro` (handles global meta/SEO)
- Data layer: `src/lib/data.ts`
- Project name: "SchemeWise" (offline file: `public/healthbridge-offline.html`)

## Patterns observed
- Renders link arrays via `.map()` over label arrays to produce styled pill/button components
- Minimalist public-service style copy
- Provides standalone offline HTML versions of the app for users without internet
- Each page sets SEO via layout props (title, description, OG, canonical)
- Offline HTML file mirrors the Astro site but needs its own meta/SEO tags hand-written (not via layout)

## Known issues / edits made
- Removed "No account needed" tagline from `src/pages/index.astro`
- Removed social link pills (GitHub/LinkedIn/Email) from `src/pages/about.astro`
- Created offline HTML version (`public/healthbridge-offline.html`)
- SEO audit round 1: fixed missing meta descriptions, missing H1s, missing OG tags, missing/incorrect canonical tags, and title/description length violations across 16 pages
- SEO audit round 2: re-fixed `/healthbridge-offline` (added description, H1, OG, canonical; shortened title to "HealthBridge – Health Support & Scheme Finder"); tightened titles on `/schemes/cghs`, `/schemes/nphce`, `/schemes/pmdialysis`, and dynamic `[id].astro` scheme pages to ≤60 chars; trimmed descriptions across 11 pages