# Product SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve discoverability for 賴瓦特 LikeWater and PetVoice product pages.

**Architecture:** Keep the existing routes and page components. Add visible FAQ content inside each product component and emit route-specific Product and FAQPage JSON-LD from the central SEO module.

**Tech Stack:** Vue 3, Vue Router, `@vueuse/head`, Vite

---

### Task 1: Normalize Product Names

**Files:**
- Modify: `src/components/OHTrust.vue`
- Modify: `src/components/Products.vue`
- Modify: `src/router/index.js`

- [ ] Update visible names, alt text, title and description to consistently use `賴瓦特 LikeWater`.

### Task 2: Add Search-Relevant Page Content

**Files:**
- Modify: `src/components/OHTrust.vue`
- Modify: `src/components/PetVoice.vue`

- [ ] Add concise visible FAQ sections based on existing product claims and limitations.
- [ ] Add the PetVoice media summary internal link.

### Task 3: Add Structured Data

**Files:**
- Modify: `src/seo.js`

- [ ] Define route-specific Product and FAQPage schemas.
- [ ] Merge schemas with the existing clinic schema output.

### Task 4: Verify

- [ ] Run `npm run build`.
- [ ] Run `git diff --check`.
- [ ] Inspect both product pages and SEO output at mobile width.
