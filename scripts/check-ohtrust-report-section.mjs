import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const source = readFileSync(resolve(root, 'src/components/OHTrust.vue'), 'utf8')

const requiredSnippets = [
  'href="#reports"',
  '<section id="reports" class="report-section">',
  '<p>Biocompatibility Reports</p>',
  '<h2>完整生物相容性檢驗組合</h2>',
  '五份資料共同構成完整的生物相容性（Biocompatibility）檢驗資料組。',
  "value: '5',\n        label: '份生物相容性報告'",
  'class="report-grid"',
  'v-for="report in reports"',
  'const reports = [',
  "name: '急性全身毒性研究'",
  "name: '皮膚致敏測試'",
  "name: '兔子熱原研究'",
  "name: '體外細胞毒性試驗'",
  "name: '兔子皮內刺激研究'",
  "link: '/reports/relano-in-vitro-cytotoxicity.pdf'",
  "link: '/reports/relano-intracutaneous-irritation-rabbits.pdf'",
  'const evidenceRows = [',
  "test: '安定性'"
]

const forbiddenSnippets = [
  'class="report-construction-state"',
  '檢驗報告建置中…',
  'drive.google.com/file/'
]

const reportFiles = [
  'public/reports/relano-acute-systemic-toxicity.pdf',
  'public/reports/relano-skin-sensitisation.pdf',
  'public/reports/relano-pyrogen-study-rabbits.pdf',
  'public/reports/relano-in-vitro-cytotoxicity.pdf',
  'public/reports/relano-intracutaneous-irritation-rabbits.pdf'
]

const missingSnippets = requiredSnippets.filter((snippet) => !source.includes(snippet))
const remainingSnippets = forbiddenSnippets.filter((snippet) => source.includes(snippet))
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
  remainingSnippets.length > 0 ||
  invalidFiles.length > 0 ||
  duplicateReportCount > 0
) {
  console.error(
    [
      `OHTrust report cards missing: ${missingSnippets.join(', ') || 'none'}`,
      `OHTrust still exposes temporary content: ${remainingSnippets.join(', ') || 'none'}`,
      `OHTrust report files missing or invalid: ${invalidFiles.join(', ') || 'none'}`,
      `OHTrust duplicate report files: ${duplicateReportCount}`
    ].join('\n')
  )
  process.exit(1)
}

console.log('OHTrust five-report publication check passed.')
