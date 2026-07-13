import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const root = resolve(__dirname, '..')
const cardPath = resolve(root, 'src/components/products/ProductComparisonCard.vue')

if (!existsSync(cardPath)) {
  console.error('Products redesign check failed. Missing ProductComparisonCard.vue')
  process.exit(1)
}

const cardSource = readFileSync(cardPath, 'utf8')
const requiredCardSnippets = [
  'product-comparison-card',
  '<article',
  '<h2>{{ product.title }}</h2>',
  '<dl class="product-facts">',
  '<RouterLink',
  '查看產品詳情',
  'loading="eager"',
  'decoding="async"',
  ':width="product.width"',
  ':height="product.height"',
  '@media (max-width: 767.98px)'
]

const missingCardSnippets = requiredCardSnippets.filter(
  (snippet) => !cardSource.includes(snippet)
)

if (missingCardSnippets.length > 0) {
  console.error(
    `Products redesign check failed. Product card missing: ${missingCardSnippets.join(', ')}`
  )
  process.exit(1)
}

console.log('Products comparison card check passed.')
