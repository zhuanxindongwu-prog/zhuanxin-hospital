# Search Trust Phase Two Implementation Plan

> **For agentic workers:** Execute inline with superpowers:executing-plans and a fresh final reviewer. User authorized continued optimization and deployment.

**Goal:** Make clinic facts and authorship consistent across visible pages, initial HTML, runtime metadata and article feeds.

**Architecture:** Shared `siteIdentity` produces the clinic/WebSite graph and weekly hours. Shared article-byline builder links existing authors to real profiles. Existing build and runtime consumers use these shared contracts.

**Tech Stack:** Vue 3, Vite, Node tests, RSS 2.0, Atom, Vercel Git deployment.

**Spec:** `docs/superpowers/specs/2026-11-03-search-trust-phase-two-design.md`

## Global Constraints

- No clinical text, original images, article URLs/dates, physician credentials, reviews or booking-flow changes.
- No new external profiles or medical review assertions; fallback byline remains the institution.
- Continue in the existing project and preview, using a temporary release branch.

## Review Focus

- Different site URL prefixes must produce consistent absolute IDs, including author/profile references.
- Unknown external authors must not acquire hospital employment or fabricated profile IDs.
- Sunday remains visibly closed while schema contains the existing six open days.
- Multiple authors must survive Atom and RSS serialization, with XML escaping and original dates intact.
- Runtime navigation into noindex pages must still remove static feed/schema data.

### Task 1: Shared clinic facts and homepage information credit

**Files:** `src/data/siteIdentity.js`, `src/data/homepageSearch.js`, homepage SFC, `src/seo.js`, static generator; new `src/searchTrust.test.js`, existing homepage/static tests.

**Interfaces:** `clinicWeeklyHours` records `{label,day,opens?,closes?,closed?}`; `createClinicSchema(siteUrl)` returns the common clinic/WebSite graph.

- [ ] Add failing output tests for six open days, contact, visible institution credit and matching homepage author.
- [ ] Implement the shared graph and visible hours/credit using existing facts.
- [ ] Verify schema output and rendered homepage with current tests.

### Task 2: Article and feed author identity

**Files:** new `src/data/articleBylines.js`, article schema consumers, feed generator and tests.

**Interfaces:** `createArticleByline(article, siteUrl)` returns existing Person entities or the hospital Organization. Known doctor records get the existing profile `#person` identity and worksFor; external records retain their own URL only.

- [ ] Add failing tests for named/multiple authors, institution fallback and external-author boundaries.
- [ ] Use the shared byline for static/runtime Article and RSS/Atom entries, preserving source names and job titles.
- [ ] Run the full suite and parse both generated XML formats independently.

### Task 3: Review and deployment

- [ ] Independently review this delta from `1095a1f`, resolve substantive findings, verify mobile/runtime/noindex behavior.
- [ ] Save backup tag, commit, fast-forward main and deploy through the existing Git integration.
- [ ] Check live homepage graph,44 article contracts,feeds and private-route headers; rerun GeoReady and record cache status.
