# OHTrust Evidence Dossier Redesign

## Goal

Redesign `OHTrust.vue` around the five published RELANO WOUND SPRAY biocompatibility reports. The page must let pet owners and veterinary professionals understand what was tested, inspect the original reports, and distinguish report findings from untested medical claims.

## Design Direction

- Page type: evidence-led veterinary product page.
- Audience: pet owners first, veterinary professionals second.
- Tone: trustworthy, verifiable, restrained, and plain-language.
- Visual language: editorial medical dossier using `#69964A`, `#006B70`, white, and quiet neutral surfaces.
- Design dials: variance 4, motion 2, density 5.
- Cards use at most an 8px radius. Motion is limited to short transform and opacity feedback and respects reduced-motion preferences.

## Content Corrections

The existing "basic five safety tests" section lists skin irritation, skin allergy, acute inhalation toxicity, oral toxicity, and stability. That list does not correspond to the five PDF reports currently published on the page.

Replace that section and the generic clinical interpretation table with the five report-backed endpoints:

1. In vitro cytotoxicity.
2. Intracutaneous irritation.
3. Acute systemic toxicity.
4. Skin sensitisation.
5. Pyrogen response.

Do not claim that these reports prove medical efficacy, sterilization, treatment effects, safety for every species or exposure route, or absence of all possible risks.

## Verified Report Data

### In Vitro Cytotoxicity

- Chinese title: 體外細胞毒性試驗
- English title: In Vitro Cytotoxicity Test
- Report number: `23S186CE-01-R01`
- Standard: `ISO 10993-5:2009` and `EN ISO 10993-5:2009`
- Model and method: mouse fibroblast L929 cells; qualitative morphology assessment and quantitative MTT assay after 24-hour treatment with the test article extract.
- Report finding: qualitative and quantitative results showed zero reactivity; no in vitro cytotoxicity was observed in the test article extract under the study conditions.
- PDF: `/reports/relano-in-vitro-cytotoxicity.pdf`

### Intracutaneous Irritation

- Chinese title: 兔子皮內刺激研究
- English title: Intracutaneous Irritation Study in Rabbits
- Study number: `TW025-23020L01`
- Standard: `ISO 10993-23:2021`
- Model and method: three rabbits; polar and non-polar extracts injected intracutaneously, with erythema and edema assessed at 24, 48, and 72 hours.
- Report finding: no erythema or edema was observed; test and control mean-score differences were 0.0, and the response was categorized as negligible under the study conditions.
- PDF: `/reports/relano-intracutaneous-irritation-rabbits.pdf`

### Acute Systemic Toxicity

- Chinese title: 急性全身毒性研究
- English title: Acute Systemic Toxicity Study
- Report number: `23S186T04-01-R01`
- Standard: `ISO 10993-11:2017`
- Model and method: mice receiving polar and non-polar test article extracts, with systemic responses assessed through 72 hours.
- Report finding: the test article extracts did not cause a toxicity reaction or death in mice under the study conditions; treatment animals did not show greater biological reactivity than controls.
- PDF: `/reports/relano-acute-systemic-toxicity.pdf`

### Skin Sensitisation

- Chinese title: 皮膚致敏測試
- English title: Skin Sensitisation Test (Guinea Pig Maximisation Test)
- Study number: `TW025-23021L01`
- Standard: `ISO 10993-10:2021`
- Model and method: guinea pig maximisation test using polar and non-polar extracts, with dermal reactions scored 24 and 48 hours after challenge-patch removal.
- Report finding: neither extract produced skin sensitisation in guinea pigs under the study conditions; the test item was not considered a sensitizer in this test.
- PDF: `/reports/relano-skin-sensitisation.pdf`

### Pyrogen Study

- Chinese title: 兔子熱原研究
- English title: Pyrogen Study in Rabbits
- Report number: `23S186T09-01-R01`
- Standards: `USP 45/NF40:2022 <151>` and `ISO/TR 21582:2021`
- Model and method: three New Zealand White rabbits receiving a single intravenous dose of the test article extract; body temperature measured five times after dosing.
- Report finding: temperature elevations were 0.12°C, 0.04°C, and 0.09°C; the pyrogen response was negative and the extract met the report's absence-of-pyrogens requirement under the study conditions.
- PDF: `/reports/relano-pyrogen-study-rabbits.pdf`

## Information Architecture

### 1. Product Hero

Keep the product image and name. Replace broad safety-oriented copy with evidence-led copy:

- Primary statement: five published biocompatibility assessments with original reports available for review.
- Metrics: five original reports, five assessed endpoints, and complete PDF access.
- Primary action: jump to the report dossier.
- Secondary action: jump to product use and limitations.

### 2. Product Use

Retain a concise product-use section describing environmental surface cleaning and odor management. Keep ventilation and avoid-direct-inhalation guidance visible. Remove duplicated feature-card sections where they repeat the same message.

### 3. Evidence Overview

Introduce the five endpoints as a compact evidence index. Explain that biocompatibility testing evaluates specific biological responses under defined study conditions and does not establish treatment efficacy.

### 4. Evidence Dossier

Use a two-column editorial layout on desktop:

- Left column: a sticky evidence summary with scope note and a direct link to the interpretation section.
- Right column: five vertically stacked report records.

Each record contains:

- Sequence number.
- Chinese and English titles.
- Report or study number.
- Standard.
- Model and method summary.
- Plain-language finding.
- A clearly labeled PDF link.

The records are not generic feature cards. Use horizontal rules, aligned metadata, restrained surface contrast, and a visible result block to create a report-file appearance.

### 5. Interpretation Boundary

Replace the generic four-column table with two adjacent, clearly labeled lists:

- "報告可以支持": the five extracts produced the stated findings under their specific study conditions.
- "報告不能代表": treatment efficacy, medical-grade disinfection, direct-use approval for every body site, every exposure route, or zero risk for every animal.

Include a short note that the original PDFs control if a page summary differs from a report.

### 6. Product Positioning and FAQ

Retain the product-positioning notice, professional-use reminders, FAQ, and contact CTA. Consolidate repeated warnings so the page does not repeat the same caveat in multiple card sections.

## Responsive Behavior

- At widths below 768px, the dossier becomes one column and the sticky behavior is removed.
- Report metadata changes from aligned rows to compact label-value pairs.
- The result block remains fully visible; no horizontal table scrolling is required.
- PDF actions become full-width links with at least a 44px touch target.
- Hero metrics use a stable single-column stack on narrow phones.

## Accessibility

- Keep a single page-level `h1` and preserve logical `h2`/`h3` hierarchy.
- PDF links include the report name in their accessible label and indicate that they open a PDF.
- Result meaning cannot depend on color alone.
- Use sufficient contrast for muted metadata.
- Support keyboard focus and `prefers-reduced-motion`.

## Implementation Boundaries

- Keep the implementation inside `src/components/OHTrust.vue` unless a small report-data module materially improves readability.
- Preserve all five current PDF paths.
- Do not modify or re-export the source PDFs.
- Remove the obsolete `basicTests` and `evidenceRows` data after their sections are replaced.
- Remove superseded legacy CSS rules rather than adding another override layer.
- Do not change unrelated routes, product pages, navigation, or doctor-schedule data.

## Verification

Update `scripts/check-ohtrust-report-section.mjs` before production code so it initially fails for the missing dossier behavior. It must assert:

- All five report or study numbers.
- All five verified standards.
- All five result summaries.
- All five PDF links.
- Absence of the obsolete basic-test section and obsolete test names such as acute inhalation, oral toxicity, and stability.
- Five unique, valid PDF files.

After implementation:

- Run the OHTrust verification script.
- Run the production build.
- Inspect desktop and mobile layouts in the in-app browser.
- Confirm exactly five report records, working PDF responses, visible focus states, no overflow, and no browser console errors.

