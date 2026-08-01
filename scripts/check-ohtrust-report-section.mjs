import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const source = readFileSync(resolve(root, 'src/components/OHTrust.vue'), 'utf8')

const requiredSnippets = [
  'href="#reports"',
  '<section id="reports" class="report-section">',
  '<p>Safety Reports</p>',
  '<h2>檢驗報告</h2>',
  'class="report-construction-state"',
  '檢驗報告建置中…',
  'const evidenceRows = [',
  "test: '安定性'"
]

const forbiddenSnippets = [
  'v-for="report in reports"',
  'const reports = [',
  'drive.google.com/file/'
]

const missingSnippets = requiredSnippets.filter((snippet) => !source.includes(snippet))
const remainingSnippets = forbiddenSnippets.filter((snippet) => source.includes(snippet))

if (missingSnippets.length > 0 || remainingSnippets.length > 0) {
  console.error(
    [
      `OHTrust construction state missing: ${missingSnippets.join(', ') || 'none'}`,
      `OHTrust still exposes report links: ${remainingSnippets.join(', ') || 'none'}`
    ].join('\n')
  )
  process.exit(1)
}

console.log('OHTrust report construction state check passed.')
