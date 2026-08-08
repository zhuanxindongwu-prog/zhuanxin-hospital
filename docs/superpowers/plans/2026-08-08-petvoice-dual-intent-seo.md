# PetVoice Dual-Intent SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the crawlable quality and distinct search intent of the PetVoice product page and PetVoice media article while preserving the preferred site name `專心動物醫院`.

**Architecture:** Keep `/petvoice` as a Product/WebPage entity and `/articles/media/petvoice-home-monitoring` as an Article entity. Centralize product trust and search content in `productSeo`, render it in the Vue page and static HTML generator, and verify the generated deployment output instead of only checking source strings.

**Tech Stack:** Vue 3, Vue Router, Vite, `@vueuse/head`, Node test runner, JSON-LD, static HTML generation.

## Global Constraints

- Keep both PetVoice URLs indexable with self-referencing canonical URLs.
- Do not redirect, merge, or cross-canonicalize the product page and media article.
- Keep the preferred site name exactly `專心動物醫院`.
- Do not add `alternateName` to WebSite or Organization schema.
- Do not claim that PetVoice diagnoses disease or replaces veterinary evaluation.
- Use only facts visible on the page or supported by the linked official sources.

---

### Task 1: Add generated-HTML SEO regression coverage

**Files:**
- Modify: `scripts/seo-phases-1-3.test.js`

**Interfaces:**
- Consumes: generated route files under `dist/<route>/index.html`.
- Produces: assertions for substantial PetVoice content, distinct page intent, self-canonical URLs, schema types, internal links, and the preferred site name.

- [ ] **Step 1: Write failing tests**

Add tests that parse `/petvoice` and `/articles/media/petvoice-home-monitoring`, require at least 1,200 text characters and five H2 headings on the product page, verify distinct title/H1/description values, verify self-canonical URLs, and inspect JSON-LD types and trust fields.

- [ ] **Step 2: Verify tests fail for the missing behavior**

Run: `npm run test:seo`

Expected: FAIL because the current `/petvoice` initial HTML is thin and lacks semantic H2 content and product trust schema fields.

### Task 2: Centralize PetVoice search and trust content

**Files:**
- Modify: `src/data/productSeo.js`
- Modify: `src/components/PetVoice.vue`

**Interfaces:**
- Consumes: existing PetVoice product facts and visible purchase terms.
- Produces: `productSeo['/petvoice']` fields `updatedDate`, `reviewer`, `sources`, `relatedLinks`, `purchaseNotices`, and `staticSections` used by Vue and static generation.

- [ ] **Step 1: Extend PetVoice product data**

Add the approved Taiwan product positioning, official PetVoice source URLs, review metadata, related internal pages, and search-focused section content without introducing price or diagnostic claims.

- [ ] **Step 2: Render shared trust information on the product page**

Use the centralized purchase notices and sources in `PetVoice.vue`, add a visible update/review/source panel, and preserve the existing design and purchase alert behavior.

- [ ] **Step 3: Keep the product-page title and H1 aligned**

Set the router title and visible H1 to lead with `PetVoice 台灣` and clearly describe purchase, warranty, and home physiological monitoring intent.

### Task 3: Generate substantial PetVoice initial HTML and schema parity

**Files:**
- Modify: `scripts/generate-static-seo.mjs`
- Modify: `src/seo.js`

**Interfaces:**
- Consumes: the extended `productSeo['/petvoice']` data and `extractVueStaticContent()`.
- Produces: full static body content and matching runtime/static Product, WebPage, FAQPage, and BreadcrumbList schemas.

- [ ] **Step 1: Extract and supplement static product content**

Use `extractVueStaticContent()` for `/petvoice`, append dynamic purchase, FAQ, trust, and related-link data, and deduplicate links.

- [ ] **Step 2: Align static and runtime product schemas**

Add `dateModified`, `reviewedBy`, `citation`, audience, and `additionalProperty` to the correct schema nodes while keeping the Product claims visible on the page.

- [ ] **Step 3: Update sitemap lastmod from shared data**

Use the product update date and the media article update date in generated sitemap entries.

### Task 4: Strengthen the supporting media article without cannibalization

**Files:**
- Modify: `src/data/mediaArticles.js`

**Interfaces:**
- Consumes: existing authorized media sources and article structure.
- Produces: distinct media intent, FAQ content, updated date, and contextual product/guide links.

- [ ] **Step 1: Add article-specific FAQs and clarify intent**

Answer why the hospital introduced PetVoice, what the media coverage represents, and how monitoring differs from diagnosis. Preserve the existing news title and source list unless accuracy requires a correction.

- [ ] **Step 2: Verify self-canonical separation**

Ensure no field or generator rule points either PetVoice page's canonical URL at the other.

### Task 5: Verify the complete output

**Files:**
- Verify: `dist/index.html`
- Verify: `dist/petvoice/index.html`
- Verify: `dist/articles/media/petvoice-home-monitoring/index.html`
- Verify: `dist/sitemap.xml`

**Interfaces:**
- Consumes: complete production build.
- Produces: test and audit evidence for deployment.

- [ ] **Step 1: Run focused checks**

Run: `npm run test:seo`

Expected: all SEO regression tests pass.

- [ ] **Step 2: Run complete verification**

Run: `npm run verify`

Expected: build, SEO tests, application tests, site-name checks, and SEO audit pass with zero failures.

- [ ] **Step 3: Inspect generated HTML values**

Parse titles, descriptions, H1/H2 counts, canonical URLs, visible text length, internal links, and schema nodes from all three generated pages. Confirm the homepage contains exactly one WebSite name and it equals `專心動物醫院`.

