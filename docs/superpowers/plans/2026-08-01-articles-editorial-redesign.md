# Articles Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/articles` as the selected specialist editorial layout while preserving existing content, routes, and SEO.

**Architecture:** Keep the implementation in `src/components/articles.vue` and derive all editorial groups from existing article data. Add a source-level regression script to lock the selected structure, then verify build output and responsive behavior in the in-app browser.

**Tech Stack:** Vue 3 Composition API, Vue Router, scoped CSS, Bootstrap Icons, Vite.

## Global Constraints

- Preserve every existing article URL and source data object.
- Preserve the route title, description, and single visible `h1`.
- Use `#69964A` and `#006B70` through existing theme variables.
- Use no new runtime dependency.
- Maximum card radius is `8px`.
- Desktop and 390px mobile must not overflow horizontally.

---

### Task 1: Lock The Editorial Structure

**Files:**
- Create: `scripts/check-articles-editorial-layout.mjs`
- Test: `scripts/check-articles-editorial-layout.mjs`

**Interfaces:**
- Consumes: `src/components/articles.vue` as UTF-8 source.
- Produces: a zero-exit regression check for required sections and interactions.

- [ ] **Step 1: Write the failing source-level regression test**
- [ ] **Step 2: Run `node scripts/check-articles-editorial-layout.mjs` and confirm it fails because the editorial feature is absent**
- [ ] **Step 3: Keep the test focused on stable user-facing structure rather than CSS implementation details**

### Task 2: Implement The Editorial Page

**Files:**
- Modify: `src/components/articles.vue`
- Test: `scripts/check-articles-editorial-layout.mjs`

**Interfaces:**
- Consumes: `mediaArticles`, `careArticles`, `cardiologyGuideCards`, and `sortArticlesByDateDesc`.
- Produces: `allCareArticles`, `latestArticle`, `monthlyFocus`, `readingPaths`, and `filteredArticles` computed page models.

- [ ] **Step 1: Replace the oversized hero with a compact masthead and trust note**
- [ ] **Step 2: Implement the featured article, monthly focus list, and reading paths**
- [ ] **Step 3: Merge care sources into one searchable/filterable article feed**
- [ ] **Step 4: Keep media coverage separate and source-aware**
- [ ] **Step 5: Implement responsive styles matching the selected mock**
- [ ] **Step 6: Run the regression check until it passes**

### Task 3: Verify Production And Responsive Behavior

**Files:**
- Create: `design-qa.md`
- Verify: `src/components/articles.vue`

**Interfaces:**
- Consumes: selected mock image and local `/articles` implementation.
- Produces: passing build, browser evidence, and `design-qa.md` with `final result: passed`.

- [ ] **Step 1: Run every `scripts/check-*.mjs` regression check**
- [ ] **Step 2: Run `npm run build` and verify static SEO generation succeeds**
- [ ] **Step 3: Capture desktop at `1440x1024` and mobile at `390x844`**
- [ ] **Step 4: Test search, category selection, reading-path selection, and empty-state reset**
- [ ] **Step 5: Compare the selected mock and implementation in one visual review**
- [ ] **Step 6: Fix all P0/P1/P2 mismatches and record the final result**

