# LikeWater Five Biocompatibility Reports Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish five unique LikeWater biocompatibility reports while preserving the three existing report URLs and omitting duplicate PDF files.

**Architecture:** Keep the existing `OHTrust.vue` report grid and extend its data from three to five entries. Store the two new source PDFs under stable ASCII filenames in `public/reports`, and extend the existing Node check so the rendered data contract, PDF validity, and cross-file uniqueness are verified together.

**Tech Stack:** Vue 3 SFC, Vite, Node.js ESM, SHA-256 file hashing

## Global Constraints

- Keep the existing acute systemic toxicity, skin sensitisation, and pyrogen report URLs unchanged.
- Add only the in vitro cytotoxicity and intracutaneous irritation PDFs.
- Display exactly five report cards and five unique PDF URLs.
- Use conservative summaries grounded in the report conclusions.
- Preserve the existing LikeWater visual system and `#reports` anchor.

---

### Task 1: Publish Five Unique Biocompatibility Reports

**Files:**
- Modify: `scripts/check-ohtrust-report-section.mjs`
- Modify: `src/components/OHTrust.vue:182-203`
- Modify: `src/components/OHTrust.vue:307-320`
- Modify: `src/components/OHTrust.vue:378-394`
- Create: `public/reports/relano-in-vitro-cytotoxicity.pdf`
- Create: `public/reports/relano-intracutaneous-irritation-rabbits.pdf`

**Interfaces:**
- Consumes: the five verified source reports and the existing `reports` array shape `{ name, desc, link }`.
- Produces: five unique PDF links rendered by the existing `v-for="report in reports"` grid.

- [ ] **Step 1: Expand the failing report contract**

Update `scripts/check-ohtrust-report-section.mjs` to require the five-report count, two new card names, and two new public paths:

```js
const requiredSnippets = [
  "value: '5'",
  "name: '體外細胞毒性試驗'",
  "name: '兔子皮內刺激研究'",
  "link: '/reports/relano-in-vitro-cytotoxicity.pdf'",
  "link: '/reports/relano-intracutaneous-irritation-rabbits.pdf'"
]

const reportFiles = [
  'public/reports/relano-acute-systemic-toxicity.pdf',
  'public/reports/relano-skin-sensitisation.pdf',
  'public/reports/relano-pyrogen-study-rabbits.pdf',
  'public/reports/relano-in-vitro-cytotoxicity.pdf',
  'public/reports/relano-intracutaneous-irritation-rabbits.pdf'
]
```

Hash all five files with `createHash('sha256')` and fail when `new Set(reportHashes).size !== reportFiles.length`.

- [ ] **Step 2: Run the contract and verify RED**

Run:

```bash
node scripts/check-ohtrust-report-section.mjs
```

Expected: FAIL because the component still advertises three reports and the two new PDF assets do not exist.

- [ ] **Step 3: Add the two unique PDF assets**

Copy the verified sources to stable public paths:

```bash
cp '/Users/cardiospeical/Downloads/4C00916DE67FE89DB209BB17BABD3876D140BB3D_秀傳 (體外細胞毒性試驗.不存在體外細胞毒性) In vitro Cytotoxicity_Relano.pdf' \
  public/reports/relano-in-vitro-cytotoxicity.pdf
cp '/Users/cardiospeical/Downloads/A90489B5ABAA331A38B60A9F9C36A30CE8755E0F_秀傳動物試驗 (皮內刺激研究.兔子.符合要求) Intracutaneous Irritation Study_Relano TW025-23020L01.pdf' \
  public/reports/relano-intracutaneous-irritation-rabbits.pdf
```

- [ ] **Step 4: Update LikeWater report copy and cards**

Change the report count to `5`, list all five studies in the intro, and append:

```js
{
  name: '體外細胞毒性試驗',
  desc: 'In Vitro Cytotoxicity Test · 測試條件下呈零反應',
  link: '/reports/relano-in-vitro-cytotoxicity.pdf',
},
{
  name: '兔子皮內刺激研究',
  desc: 'Intracutaneous Irritation Study in Rabbits · 測試反應可忽略',
  link: '/reports/relano-intracutaneous-irritation-rabbits.pdf',
},
```

Use this section description:

```html
<p>本組公開報告涵蓋體外細胞毒性、皮內刺激、急性全身毒性、皮膚致敏與兔子熱原研究，五份資料共同構成完整的生物相容性（Biocompatibility）檢驗資料組。</p>
```

- [ ] **Step 5: Verify GREEN and production build**

Run:

```bash
node scripts/check-ohtrust-report-section.mjs
npm run build
git diff --check
```

Expected: the report check passes, Vite exits 0, and no whitespace errors are reported.

- [ ] **Step 6: Verify in the browser**

Open `http://127.0.0.1:5173/ohtrust#reports` and verify:

- five report cards are visible;
- the two new cards have unique local PDF URLs;
- the section states five reports;
- no console errors are emitted.

- [ ] **Step 7: Commit**

```bash
git add scripts/check-ohtrust-report-section.mjs src/components/OHTrust.vue public/reports/relano-in-vitro-cytotoxicity.pdf public/reports/relano-intracutaneous-irritation-rabbits.pdf docs/superpowers/plans/2026-08-03-ohtrust-five-biocompatibility-reports.md
git commit -m "feat: publish five LikeWater biocompatibility reports"
```
