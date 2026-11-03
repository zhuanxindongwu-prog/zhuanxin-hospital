# Sitewide SEO and GEO Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans for inline execution. Checkboxes record verified deliverables.

**Goal:** Improve homepage and all article discovery and trustworthy retrieval in Traditional Chinese.

**Architecture:** Normalize the existing article sources in a shared pure JavaScript module; reuse it for browser metadata, static output, visible article context, the collection schema and the AI-oriented article index.

**Tech Stack:** Vue 3, Vue Router, Vite, Node test runner, build-time HTML and JSON-LD.

**Spec:** ../specs/2026-11-03-sitewide-seo-geo-design.md

## Global Constraints

- Preserve URLs, medical statements, photos, original publication/update dates, and declared author/reviewer identities.
- Use only existing content for summaries and FAQs; do not imply new medical review.
- Do not deploy as part of this implementation request.

## Review Focus

- An article with authors but no reviewer must not acquire a fabricated review date or reviewer.
- An article without a hand-written summary must still have a useful original-content description.
- Empty optional lists must not create broken anchors or blank structured entities.
- Every generated reference/author/related link must be retained in both static and runtime content.
- Canonical and metadata must remain stable after browser hydration and route changes.

### 1. Shared article inventory

- [x] Add `src/data/searchArticles.js`: normalized `searchArticles`, `getSearchArticle(path)`, `getArticleOverviewItems(article)`, `getArticleOutline(article)`, `createReferenceSchema(source)` and `createArticleDirectorySchema(siteUrl)`.
- [x] Add meaningful inventory, attribution, citation and outline tests in `src/searchArticles.test.js`; observe a missing-module failure, then make them pass.

### 2. Visible content and metadata

- [x] Add reusable `ArticleOverview.vue`, mount it in the three article layout families and six existing standalone components; preserve existing body content.
- [x] Add matching section/reference anchors and TOCs to data-driven layouts and static output.
- [x] Use normalized article descriptions/SEO titles in `src/seo.js` and the static generator; connect Article/WebSite/Collection entities and correct reference/review-date semantics.

### 3. Homepage and discovery

- [x] Add shared homepage facts and FAQ data; render visible FAQ and matching homepage schema without changing existing veterinarian, pet or contact functionality.
- [x] Add an exhaustive article ItemList, generated article links in llms.txt and image/snippet preview directives.

### 4. Verification and handoff

- [x] Add a build-output coverage audit for every article, wired into `npm run verify`.
- [x] Run `npm run verify`, site-name signals, targeted browser hydration and responsive checks.
- [x] Record actual coverage, limitations and local previews; leave deployment for the user's next instruction.
