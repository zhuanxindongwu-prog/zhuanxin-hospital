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
  'aspect-ratio: 16 / 9;',
  'min-height: 64px;',
  'padding: clamp(1.5rem, 2.5vw, 2rem);',
  'grid-template-columns: repeat(2, minmax(0, 1fr));',
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

const productsPath = resolve(root, 'src/components/Products.vue')
const productsSource = readFileSync(productsPath, 'utf8')

const requiredPageSnippets = [
  "import ProductComparisonCard from './products/ProductComparisonCard.vue'",
  '<h1 id="products-title">精選照護產品</h1>',
  'products-comparison-grid',
  '<ProductComparisonCard',
  'products-care-boundary',
  '產品協助觀察與管理，不取代獸醫師診斷。',
  "link: '/petvoice'",
  "link: '/ohtrust'",
  'width: 1000',
  'height: 804',
  'width: 1280',
  'height: 905',
  'padding: 7rem 0 2.25rem;',
  'padding: 0.5rem 1rem;',
  '@media (max-width: 767.98px)'
]

const forbiddenPageSnippets = [
  '把專業照護，延伸到每天的生活。',
  'hero-index',
  'product-stack',
  'product-shell'
]

const missingPageSnippets = requiredPageSnippets.filter(
  (snippet) => !productsSource.includes(snippet)
)
const remainingOldSnippets = forbiddenPageSnippets.filter((snippet) =>
  productsSource.includes(snippet)
)
const h1Count = (productsSource.match(/<h1(?:\s|>)/g) || []).length

if (missingPageSnippets.length > 0 || remainingOldSnippets.length > 0 || h1Count !== 1) {
  console.error(
    [
      `Products page missing: ${missingPageSnippets.join(', ') || 'none'}`,
      `Products page still contains old layout: ${remainingOldSnippets.join(', ') || 'none'}`,
      `Products page H1 count: ${h1Count}`
    ].join('\n')
  )
  process.exit(1)
}

console.log('Products equal comparison redesign check passed.')
