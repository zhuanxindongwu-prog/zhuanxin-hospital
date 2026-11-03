# GeoReady Rollout Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans inline, with a fresh final reviewer. The user has already authorized the proposed implementation and deployment.

**Goal:** Deploy the existing sitewide improvements with coherent homepage identity, truthful maintenance information and generated article subscriptions.

**Architecture:** Extend the existing shared data and static build pipeline. Both client and static homepage consume the same WebPage builder and identity links. Generate RSS and Atom from the canonical article inventory.

**Tech Stack:** Vue 3, Vite, Node test runner, Vercel Git deployment.

**Spec:** `docs/superpowers/specs/2026-11-03-geoready-rollout-design.md`

## Global Constraints

- Preserve clinical text, image assets, existing URLs, eight doctors, decorative pets and contact-only actions.
- Use 2026-11-03 only for the actual homepage update; preserve article publication and modification dates.
- No fabricated identity profiles, authors, reviews, search actions or AI-specific endpoints.
- Keep the current project directory and preview; a temporary local branch separates this release from main.

## Review Focus

- Chinese text, ampersands and angle brackets must remain valid XML with unique canonical entries.
- Atom updated and RSS lastBuildDate reflect content dates, never build time; preserve publication dates.
- Initial HTML and runtime head must retain matching identity, publisher, update and feed links.
- H1 separation retains the original visual slogan and mobile fit; footer additions wrap and remain usable.
- Noindex routes must remain excluded, and an audit served from cache is not a new result.

### Task 1: Homepage identity and maintenance

**Files:** new `src/data/siteIdentity.js`; modify `src/data/homepageSearch.js`, `src/components/homepage/Homepage.vue`, its CSS, `src/seo.js`, `scripts/generate-static-seo.mjs`; tests in `src/homepagePreview.test.js`, `scripts/seo-phases-1-3.test.js`.

**Interfaces:** identityLinks `{label,url}[]`, shared `createHomepageSchema(siteUrl, title)` returns WebPage. Existing homepageSearchUpdatedDate remains authoritative.

- [ ] Add meaningful output assertions: exactly one hospital-only H1, separate slogan, visible maintainer/date, matching publisher/dateModified and verified identity URLs. Observe failures.
- [ ] Implement shared identity links and homepage schema, maintain original slogan styling; update both static and runtime schemas.
- [ ] Verify rendered and initial homepage contracts.

### Task 2: Article RSS and Atom

**Files:** new `src/data/articleFeeds.js`, `src/articleFeeds.test.js`; modify build generator, runtime head and homepage/shared footers; static tests.

**Interfaces:** `createArticleFeeds(articles, siteUrl)` returns `{rss, atom}`; `articleFeedLinks` declares relative feed URLs, MIME types and names. Input is canonical searchArticles.

- [ ] Write tests for all article paths, sorting, escaping, stable real dates, unique IDs and publication/update distinction; observe missing implementation failure.
- [ ] Generate both XML outputs during normal build, expose alternate head links and visible subscription links.
- [ ] Parse produced XML with a real XML parser; verify 44 unique canonical URLs in both feeds.

### Task 3: Review, deployment and live verification

**Files:** release record in `docs/SEO_GEO_OPTIMIZATION_2026-11-03.md`.

- [ ] Run `npm run verify`, browser check desktop/mobile homepage, representative article, feed discovery and pet toggle; inspect output.
- [ ] Request an independent review of the entire pending release against this spec; address important findings.
- [ ] Preserve old release as a local Git backup tag; commit the authorized changes and push main to trigger Vercel.
- [ ] Check successful production deployment and fetch all 44 article outputs, homepage and feeds; inspect runtime head.
- [ ] Re-read GeoReady, distinguish fresh evidence from cached score; record outcome and external stale identity data for later follow-up.
