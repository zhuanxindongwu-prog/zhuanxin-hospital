# OHTrust Evidence Dossier Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the mismatched generic safety-test content in `OHTrust.vue` with a clear, responsive evidence dossier grounded in the five published biocompatibility reports.

**Architecture:** Keep the route and source PDFs unchanged. Store verified report metadata in the existing component-level `reports` array, render a two-column evidence dossier with five vertical report records, and replace the generic interpretation table with explicit support and limitation lists. Use the existing Node verification script as the executable content contract and browser inspection for responsive visual validation.

**Tech Stack:** Vue 3 SFC, Vue Router, Bootstrap layout utilities already present in the project, scoped CSS, Node.js verification scripts, Vite.

## Global Constraints

- Use `#69964A`, `#006B70`, white, and quiet neutral surfaces.
- Cards and report records use no more than an 8px radius.
- Preserve all five current PDF paths and do not modify or re-export the PDFs.
- Remove obsolete `basicTests` and `evidenceRows` data and their mismatched UI sections.
- Do not claim medical efficacy, sterilization, universal safety, or treatment effects.
- Below 768px, remove sticky positioning and render report metadata and actions in one column without horizontal scrolling.
- Keep one `h1`, logical heading order, visible focus states, 44px touch targets, and reduced-motion support.
- Do not modify unrelated routes, navigation, product pages, or doctor schedule data.

---

### Task 1: Define the Evidence Dossier Content Contract

**Files:**
- Modify: `scripts/check-ohtrust-report-section.mjs`
- Test: `scripts/check-ohtrust-report-section.mjs`

**Interfaces:**
- Consumes: `src/components/OHTrust.vue` as UTF-8 source and the five files under `public/reports/`.
- Produces: a zero-exit verification contract requiring five dossier records, verified report metadata, scope boundaries, and unique valid PDFs.

- [ ] **Step 1: Replace the old snippet contract with dossier requirements**

Require these structure snippets:

```js
const requiredSnippets = [
  'id="evidence-dossier"',
  'class="evidence-dossier-layout"',
  'class="evidence-summary"',
  'class="report-record"',
  'class="report-result"',
  'class="evidence-boundary-grid"',
  '報告可以支持',
  '報告不能代表',
  '原始 PDF 報告為準'
]
```

Require the verified identifiers and standards:

```js
const requiredReportMetadata = [
  '23S186CE-01-R01',
  'TW025-23020L01',
  '23S186T04-01-R01',
  'TW025-23021L01',
  '23S186T09-01-R01',
  'ISO 10993-5:2009',
  'ISO 10993-23:2021',
  'ISO 10993-11:2017',
  'ISO 10993-10:2021',
  'USP 45/NF40:2022 <151>',
  'ISO/TR 21582:2021'
]
```

Require short, source-grounded result phrases:

```js
const requiredFindings = [
  '零反應，未觀察到體外細胞毒性',
  '未觀察到紅斑或水腫，反應評定為可忽略',
  '未造成毒性反應或死亡',
  '未產生皮膚致敏反應',
  '熱原反應為陰性'
]
```

Forbid obsolete or overbroad content:

```js
const forbiddenSnippets = [
  'const basicTests = [',
  'const evidenceRows = [',
  '基本五項安全性測試',
  '急性吸入毒性測試',
  '口服毒性測試',
  '安定性測試',
  '全犬種適用',
  '全貓種適用'
]
```

- [ ] **Step 2: Preserve and strengthen the PDF validation**

Keep the existing five-path list, PDF magic-header check, minimum-size check, and SHA-256 duplicate detection. Add a source check that exactly five `link: '/reports/` entries exist in the `reports` array.

- [ ] **Step 3: Run the verification and confirm RED**

Run:

```bash
node scripts/check-ohtrust-report-section.mjs
```

Expected: FAIL because the component does not yet contain the dossier structure and still contains `basicTests` and `evidenceRows`.

- [ ] **Step 4: Commit the failing contract**

```bash
git add scripts/check-ohtrust-report-section.mjs
git commit -m "test: define OHTrust evidence dossier contract"
```

### Task 2: Replace Mismatched Content with Verified Report Data

**Files:**
- Modify: `src/components/OHTrust.vue:1-439`
- Test: `scripts/check-ohtrust-report-section.mjs`

**Interfaces:**
- Consumes: the dossier contract from Task 1 and the five existing PDF paths.
- Produces: `reports: Array<{ sequence, name, englishName, reportNumber, standard, model, finding, link }>` rendered into five report records.

- [ ] **Step 1: Refocus the hero**

Change the hero description to state that five published biocompatibility assessments are available for review. Use these metrics:

```js
const heroStats = [
  { value: '5', label: '份原始報告' },
  { value: '5', label: '項生物相容性評估' },
  { value: 'PDF', label: '完整內容可查閱' },
]
```

Point the primary action to `#evidence-dossier` and the secondary action to `#use-and-limits`.

- [ ] **Step 2: Consolidate product-use content**

Keep one concise product-use section describing environmental surfaces, pet supplies, odor management, ventilation, and avoidance of direct spraying into eyes, nose, or mouth. Remove the duplicate feature grid and the unverified universal breed suitability block.

- [ ] **Step 3: Replace the old test and report sections with the dossier layout**

Render:

```vue
<section id="evidence-dossier" class="report-section">
  <div class="container evidence-dossier-layout">
    <aside class="evidence-summary">...</aside>
    <div class="report-records">
      <article v-for="report in reports" :key="report.reportNumber" class="report-record">
        ...
      </article>
    </div>
  </div>
</section>
```

Each record must expose the sequence, titles, report number, standard, model, finding, and a PDF link whose accessible label names the report.

- [ ] **Step 4: Replace the `reports` array with verified metadata**

Use the exact metadata and findings in `docs/superpowers/specs/2026-08-03-ohtrust-evidence-dossier-redesign.md`. Store `USP 45/NF40:2022 <151>` as a JavaScript string; Vue interpolation will escape the angle brackets safely while preserving the visible text.

- [ ] **Step 5: Replace the interpretation table**

Render an `#use-and-limits` section with `evidence-boundary-grid` and two lists:

```js
const supportedClaims = [
  '五份報告分別評估特定生物反應，且結果限於各自報告所載的試驗條件。',
  '原始 PDF 可用於查核試驗方法、模型、觀察時間與報告結論。',
]

const unsupportedClaims = [
  '不代表疾病治療效果或可取代獸醫診療。',
  '不代表醫療級消毒、所有接觸部位或所有暴露途徑皆適用。',
  '不代表每一隻動物在任何情境下皆為零風險。',
]
```

- [ ] **Step 6: Remove obsolete data**

Delete `basicTests`, `evidenceRows`, and duplicated feature data that is no longer rendered. Retain FAQ data from `productSeo['/ohtrust']`.

- [ ] **Step 7: Run the dossier contract and confirm GREEN**

Run:

```bash
node scripts/check-ohtrust-report-section.mjs
```

Expected: `OHTrust evidence dossier check passed.`

- [ ] **Step 8: Commit the content implementation**

```bash
git add src/components/OHTrust.vue
git commit -m "feat: ground OHTrust page in published reports"
```

### Task 3: Implement the Taste-Skill Editorial Dossier Visual System

**Files:**
- Modify: `scripts/check-ohtrust-report-section.mjs`
- Modify: `src/components/OHTrust.vue:440-end`
- Test: `scripts/check-ohtrust-report-section.mjs`

**Interfaces:**
- Consumes: the semantic classes and report records from Task 2.
- Produces: a responsive editorial dossier using the approved palette and no superseded CSS override layer.

- [ ] **Step 1: Add a failing visual-structure contract**

Require the following style or class contracts in the verification script:

```js
const requiredVisualContracts = [
  '--lw-green: #69964a',
  '--lw-teal: #006b70',
  '.evidence-dossier-layout',
  'position: sticky',
  '.report-meta-grid',
  '.report-result',
  '.report-link:focus-visible',
  '@media (max-width: 767px)',
  'position: static',
  '@media (prefers-reduced-motion: reduce)'
]
```

Run `node scripts/check-ohtrust-report-section.mjs` and expect FAIL before changing the component styles.

- [ ] **Step 2: Replace the complete scoped style block**

Remove both the legacy product styles and the later "Refined product-page system" override layer. Write one coherent scoped style block with:

- White and pale neutral page surfaces.
- Teal headings and green evidence accents.
- Maximum 8px radii.
- A desktop `minmax(240px, 0.7fr) minmax(0, 1.8fr)` dossier grid.
- A sticky summary with `top` clearance below the site navigation.
- Report records separated by hairlines and quiet surface changes, not floating equal cards.
- Stable metadata columns and a visible result strip.
- Custom cubic-bezier hover/focus transitions using only transform, opacity, background color, and border color.

- [ ] **Step 3: Add explicit mobile collapse**

At `max-width: 767px`:

- Use one dossier column.
- Set the evidence summary to `position: static`.
- Stack metadata label-value pairs.
- Make `.report-link` full width and at least 48px tall.
- Ensure no element has a fixed width larger than the viewport.
- Keep section padding compact but not below 48px vertically.

- [ ] **Step 4: Verify the visual contract is GREEN**

Run:

```bash
node scripts/check-ohtrust-report-section.mjs
git diff --check
```

Expected: both commands exit 0.

- [ ] **Step 5: Commit the visual implementation**

```bash
git add scripts/check-ohtrust-report-section.mjs src/components/OHTrust.vue
git commit -m "style: redesign OHTrust as an evidence dossier"
```

### Task 4: Verify Build, PDFs, and Responsive Rendering

**Files:**
- Verify: `src/components/OHTrust.vue`
- Verify: `public/reports/relano-*.pdf`
- Verify: `dist/`

**Interfaces:**
- Consumes: the completed dossier and five existing PDF URLs.
- Produces: fresh build and browser evidence that the page is usable on desktop and mobile.

- [ ] **Step 1: Run targeted and production checks**

```bash
node scripts/check-ohtrust-report-section.mjs
npm run build
git diff --check
```

Expected: all three commands exit 0.

- [ ] **Step 2: Verify PDF responses**

Check all five local URLs and require `200 application/pdf`:

```text
/reports/relano-in-vitro-cytotoxicity.pdf
/reports/relano-intracutaneous-irritation-rabbits.pdf
/reports/relano-acute-systemic-toxicity.pdf
/reports/relano-skin-sensitisation.pdf
/reports/relano-pyrogen-study-rabbits.pdf
```

- [ ] **Step 3: Inspect desktop rendering**

Open `http://127.0.0.1:5173/ohtrust#evidence-dossier` at a desktop viewport. Confirm:

- Exactly five `.report-record` elements.
- Sticky summary and vertical records are visually aligned.
- All report metadata and result text fit without clipping.
- Focus states are visible.
- Browser console contains no errors.

- [ ] **Step 4: Inspect mobile rendering**

Use a 390 by 844 viewport. Confirm:

- Single-column dossier.
- Static summary.
- Full-width PDF actions.
- No horizontal overflow or overlapping text.
- All five records remain readable.

- [ ] **Step 5: Run the project auxiliary checks**

Run every `scripts/check-*.mjs` script and record any unrelated pre-existing failures separately. Do not modify unrelated features to make this task green.

- [ ] **Step 6: Final status check**

```bash
git status --short
git log -5 --oneline
```

Confirm only the intended commits were created and no PDF review intermediates remain under `tmp/pdfs/`.
