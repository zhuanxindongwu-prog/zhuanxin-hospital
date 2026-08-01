# LikeWater Report Construction State Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the LikeWater report-link grid with a clear construction placeholder while preserving its navigation anchor.

**Architecture:** Keep the existing `OHTrust.vue` section structure and replace only the report list with static semantic markup. A source-level regression script verifies the public contract and prevents report links from being accidentally restored.

**Tech Stack:** Vue 3 SFC, Vite, Node.js ESM check script

## Global Constraints

- Keep `#reports`, `Safety Reports`, and `檢驗報告` visible.
- Display exactly one `檢驗報告建置中…` state.
- Do not render the report array, report loop, or Google Drive report links.
- Preserve the existing LikeWater visual system.

---

### Task 1: Report Construction State

**Files:**
- Modify: `scripts/check-ohtrust-report-section.mjs`
- Modify: `src/components/OHTrust.vue`

**Interfaces:**
- Consumes: existing `#reports` navigation link and LikeWater section styles.
- Produces: a static `report-construction-state` section with no external report data.

- [ ] **Step 1: Write the failing source contract**

Require the `#reports` anchor and construction message, and forbid `v-for="report in reports"`, `const reports = [`, and report Google Drive URLs.

- [ ] **Step 2: Run the contract and verify RED**

Run: `node scripts/check-ohtrust-report-section.mjs`

Expected: FAIL because the construction markup is not present.

- [ ] **Step 3: Implement the minimal construction state**

Restore the Hero report button and `#reports` section, add one centered construction card, and keep the report array removed.

- [ ] **Step 4: Verify GREEN and build**

Run: `node scripts/check-ohtrust-report-section.mjs && npm run build && git diff --check`

Expected: contract passes, build exits 0, and no whitespace errors are reported.

- [ ] **Step 5: Browser verification**

Open `/ohtrust`, activate the Hero report button, verify the construction state is visible, and confirm no console errors.

