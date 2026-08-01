import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const source = await readFile(new URL('../src/components/articles.vue', import.meta.url), 'utf8')

const requiredMarkers = [
  'class="editorial-feature"',
  'class="monthly-focus"',
  'reading-paths',
  'id="article-library"',
  'latestArticle',
  'monthlyFocus',
  'allCareArticles',
  'aria-pressed',
  'selectReadingPath'
]

for (const marker of requiredMarkers) {
  assert.ok(source.includes(marker), `Missing editorial articles marker: ${marker}`)
}

assert.equal(source.includes('class="social-section"'), false, 'Legacy standalone social section should be removed')
assert.match(source, /border-radius:\s*8px/, 'Editorial cards should use the selected 8px radius')

console.log('Articles editorial layout check passed')
