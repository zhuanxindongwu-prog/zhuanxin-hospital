import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const source = readFileSync(resolve(root, 'src/components/OHTrust.vue'), 'utf8')

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

const requiredFindings = [
  '零反應，未觀察到體外細胞毒性',
  '未觀察到紅斑或水腫，反應評定為可忽略',
  '未造成毒性反應或死亡',
  '未產生皮膚致敏反應',
  '熱原反應為陰性'
]

const forbiddenSnippets = [
  'const basicTests = [',
  'const evidenceRows = [',
  '基本五項安全性測試',
  '急性吸入毒性測試',
  '口服毒性測試',
  '安定性測試',
  '全犬種適用',
  '全貓種適用',
  '安全性報告可支持一般接觸情境下的使用安全'
]

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

const reportFiles = [
  'public/reports/relano-acute-systemic-toxicity.pdf',
  'public/reports/relano-skin-sensitisation.pdf',
  'public/reports/relano-pyrogen-study-rabbits.pdf',
  'public/reports/relano-in-vitro-cytotoxicity.pdf',
  'public/reports/relano-intracutaneous-irritation-rabbits.pdf'
]

const expectedReportRoutes = [
  '/reports/relano-acute-systemic-toxicity.pdf',
  '/reports/relano-in-vitro-cytotoxicity.pdf',
  '/reports/relano-intracutaneous-irritation-rabbits.pdf',
  '/reports/relano-pyrogen-study-rabbits.pdf',
  '/reports/relano-skin-sensitisation.pdf'
]

const missingSnippets = requiredSnippets.filter((snippet) => !source.includes(snippet))
const missingReportMetadata = requiredReportMetadata.filter((snippet) => !source.includes(snippet))
const missingFindings = requiredFindings.filter((snippet) => !source.includes(snippet))
const remainingSnippets = forbiddenSnippets.filter((snippet) => source.includes(snippet))
const missingVisualContracts = requiredVisualContracts.filter((snippet) => !source.includes(snippet))
const reportsArray = source.match(/const reports = \[(?<body>[\s\S]*?)\n\]/)?.groups.body ?? ''
const reportRoutes = Array.from(
  reportsArray.matchAll(/\blink\s*:\s*(?<quote>["'])(?<route>\/reports\/[^"']+\.pdf)\k<quote>/g),
  (match) => match.groups.route
).sort()
const reportRoutesMatch =
  reportRoutes.length === expectedReportRoutes.length &&
  reportRoutes.every((route, index) => route === expectedReportRoutes[index])
const invalidFiles = reportFiles.filter((relativePath) => {
  const absolutePath = resolve(root, relativePath)

  if (!existsSync(absolutePath)) return true

  const file = readFileSync(absolutePath)
  return file.length < 100_000 || file.subarray(0, 5).toString() !== '%PDF-'
})
const reportHashes = reportFiles
  .filter((relativePath) => existsSync(resolve(root, relativePath)))
  .map((relativePath) => createHash('sha256').update(readFileSync(resolve(root, relativePath))).digest('hex'))
const duplicateReportCount = reportHashes.length - new Set(reportHashes).size

if (
  missingSnippets.length > 0 ||
  missingReportMetadata.length > 0 ||
  missingFindings.length > 0 ||
  remainingSnippets.length > 0 ||
  missingVisualContracts.length > 0 ||
  !reportRoutesMatch ||
  invalidFiles.length > 0 ||
  duplicateReportCount > 0
) {
  console.error(
    [
      `OHTrust report cards missing: ${missingSnippets.join(', ') || 'none'}`,
      `OHTrust report metadata missing: ${missingReportMetadata.join(', ') || 'none'}`,
      `OHTrust report findings missing: ${missingFindings.join(', ') || 'none'}`,
      `OHTrust still exposes obsolete content: ${remainingSnippets.join(', ') || 'none'}`,
      `OHTrust visual contracts missing: ${missingVisualContracts.join(', ') || 'none'}`,
      `OHTrust report routes in reports array: ${reportRoutes.join(', ') || 'none'} (expected: ${expectedReportRoutes.join(', ')})`,
      `OHTrust report files missing or invalid: ${invalidFiles.join(', ') || 'none'}`,
      `OHTrust duplicate report files: ${duplicateReportCount}`
    ].join('\n')
  )
  process.exit(1)
}

console.log('OHTrust five-report publication check passed.')
