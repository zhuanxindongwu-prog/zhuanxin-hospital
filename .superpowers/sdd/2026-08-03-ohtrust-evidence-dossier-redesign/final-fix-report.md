# OHTrust Evidence Dossier Final Fix Report

## Scope

Fixed the two approved Important findings only:

- Replaced the broad general-safety statement in `src/components/OHTrust.vue` with language that scopes all five reports to their recorded test conditions and directs actual use to the product instructions.
- Strengthened `scripts/check-ohtrust-report-section.mjs` so it extracts whitespace- and quote-tolerant `link` values from the `reports` array and compares the sorted set against the five exact published PDF routes. The checker also rejects the removed overbroad statement.

No CSS layout, report metadata, PDF assets, routes, or unrelated pages were changed.

## TDD Evidence

1. Added the checker contract before changing the component.
2. Ran `node scripts/check-ohtrust-report-section.mjs` against the prior component copy. It failed because it found `安全性報告可支持一般接觸情境下的使用安全`.
3. Replaced that sentence with: `這五份報告僅反映各自記錄的試驗條件；實際使用仍須依產品說明進行。`
4. Re-ran the checker and it passed.

## Verification

- `node scripts/check-ohtrust-report-section.mjs` passed.
- `npm run build` passed; Vite built successfully and the static SEO and asset-pruning scripts completed.
- `git diff --check` passed with no whitespace errors.

## Self-Review

The exact expected report routes are:

1. `/reports/relano-acute-systemic-toxicity.pdf`
2. `/reports/relano-in-vitro-cytotoxicity.pdf`
3. `/reports/relano-intracutaneous-irritation-rabbits.pdf`
4. `/reports/relano-pyrogen-study-rabbits.pdf`
5. `/reports/relano-skin-sensitisation.pdf`

The revised claim does not state general use safety, treatment efficacy, sterilization, or zero risk. It explicitly limits the evidence to recorded study conditions and defers actual use to the product instructions.

## Concerns

None. The checker continues to validate the corresponding PDF files and duplicate file hashes in addition to the exact route contract.
