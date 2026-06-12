# SEO and GEO Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the hospital website into a maintainable veterinary cardiology content hub with stronger E-E-A-T, semantic URLs, service pages, topic clusters, and measurable off-site SEO actions.

**Architecture:** Add a shared structured content data source and reusable page component so visible content, runtime metadata, static HTML, sitemap entries, FAQ, citations, and JSON-LD stay aligned. Preserve legacy article equity through permanent redirects and improve performance by replacing referenced raster PNG/JPEG assets with WebP where practical.

**Tech Stack:** Vue 3, Vue Router, Vite, `@vueuse/head`, JSON-LD, Vercel redirects, Node SEO audit scripts.

---

### Task 1: Add regression checks

**Files:**
- Modify: `scripts/seo-audit.mjs`

- [ ] Add checks for reviewer/source coverage, service/topic routes, semantic URLs, legacy redirects, internal links, and off-site checklist.
- [ ] Run `node scripts/seo-audit.mjs` and confirm the new checks fail before implementation.

### Task 2: Add visible article trust metadata

**Files:**
- Create: `src/components/ArticleTrustPanel.vue`
- Modify: `src/data/articleSeo.js`
- Modify: existing medical article components

- [ ] Add approved reviewer metadata and authoritative citations to every medical article.
- [ ] Render modified date, reviewer profile, and references visibly on each article.

### Task 3: Add service and topic content system

**Files:**
- Create: `src/data/seoContentPages.js`
- Create: `src/components/SeoContentPage.vue`
- Modify: `src/router/index.js`
- Modify: `src/seo.js`
- Modify: `scripts/generate-static-seo.mjs`

- [ ] Add cardiology, echocardiography, and oncology service pages.
- [ ] Add MMVD and congestive heart failure topic pages.
- [ ] Generate runtime and static Service, Article, MedicalWebPage, FAQ, citation, reviewer, and breadcrumb schemas.

### Task 4: Migrate legacy article URLs

**Files:**
- Modify: `src/router/index.js`
- Modify: `src/data/articleSeo.js`
- Modify: internal-linking components
- Modify: `vercel.json`

- [ ] Replace `/post-article*` and `/heart-pressure` canonical routes with semantic `/articles/...` routes.
- [ ] Add permanent redirects preserving legacy traffic and backlinks.
- [ ] Update all internal links.

### Task 5: Improve performance and off-site operations

**Files:**
- Modify: referenced image assets and paths where useful
- Create: `docs/SEO_OFFSITE_PLAYBOOK.md`
- Modify: `scripts/seo-audit.mjs`

- [ ] Convert referenced oversized PNG/JPEG assets to WebP where meaningful.
- [ ] Document Google Business Profile, reviews, citations, backlinks, and monthly measurement process.
- [ ] Run full build, SEO audit, redirect checks, and mobile/desktop visual verification.
